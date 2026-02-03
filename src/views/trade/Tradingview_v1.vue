<template>
  <div ref="chartContainer" style="width: 100%; height: 500px; position: relative;"></div>
</template>

<script>
import { createChart, CrosshairMode } from 'lightweight-charts';

export default {
  name: 'LightweightChartV4',
  data() {
    return {
      chart: null,
      candleSeries: null,
      markerContainer: null,
      data: [],
      markers: [],
      trendLineManager: {
        list: [],
        nextTrendId: 1
      },
    };
  },
  mounted() {
    this.initChart();
    this.initData();

    // 延迟首次绘制
    requestAnimationFrame(() => {
      this.drawMarkers();
      this.initTrendLines();
    });
  },
  methods: {
    initChart() {
      this.chart = createChart(this.$refs.chartContainer, {
        layout: { backgroundColor: '#000', textColor: '#d1d4dc' },
        grid: { vertLines: { color: '#363c4e' }, horzLines: { color: '#363c4e' } },
        crosshair: { mode: CrosshairMode.Normal },
        rightPriceScale: { borderColor: '#484d60' },
        timeScale: { borderColor: '#484d60' },
        localization: { dateFormat: 'yyyy-MM-dd' }
      });

      this.candleSeries = this.chart.addCandlestickSeries({
        upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
        wickUpColor: '#26a69a', wickDownColor: '#ef5350'
      });

      // marker 容器覆盖在 chart 上
      this.markerContainer = document.createElement('div');
      Object.assign(this.markerContainer.style, {
        position: 'absolute',
        top: '0', left: '0',
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 20
      });
      this.$refs.chartContainer.appendChild(this.markerContainer);

      // 时间范围变化或 chart 交互时刷新 marker
      this.chart.timeScale().subscribeVisibleTimeRangeChange(() => requestAnimationFrame(this.drawMarkers));
      this.chart.subscribeClick(() => requestAnimationFrame(this.drawMarkers));

      // 窗口 resize
      window.addEventListener('resize', () => {
        this.chart.resize(this.$refs.chartContainer.clientWidth, this.$refs.chartContainer.clientHeight);
        requestAnimationFrame(this.drawMarkers);
      });
    },

    initData() {
      // 模拟 30 根 K线数据
      const baseTime = Math.floor(Date.now() / 1000) - 30*24*60*60;
      let price = 100;
      for (let i=0; i<30; i++){
        const time = baseTime + i*24*60*60;
        const change = (Math.random()-0.5)*10;
        const open = price;
        const close = open + change;
        const high = Math.max(open, close) + Math.random()*5;
        const low = Math.min(open, close) - Math.random()*5;
        this.data.push({time, open, high, low, close});
        price = close;
      }
      this.candleSeries.setData(this.data);

      // 模拟 markers
      this.markers = [
        { time: this.data[5].time, type: 'buy', text: '买入信号' },
        { time: this.data[15].time, type: 'sell', text: '卖出信号' },
        { time: this.data[25].time, type: 'event', text: '财报发布' }
      ];
    },

    drawMarkers() {
      if (!this.markerContainer) return;
      this.markerContainer.innerHTML = '';
      this.markers.forEach(marker => {
        const x = this.chart.timeScale().timeToCoordinate(marker.time);
        const bar = this.data.find(d => d.time === marker.time);
        if (!bar || x === null) return;

        let price;
        if (marker.type==='buy') price = bar.low - (bar.high-bar.low)*0.25;
        else if (marker.type==='sell') price = bar.high + (bar.high-bar.low)*0.25;
        else price = (bar.high+bar.low)/2;

        const y = this.candleSeries.priceToCoordinate(price);
        if (y===null) return;

        const el = document.createElement('div');
        el.className = `marker ${marker.type}`;
        el.textContent = marker.text;
        el.style.position = 'absolute';
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.transform = 'translate(-50%, -100%)';
        this.markerContainer.appendChild(el);
      });
    },

    initTrendLines() {
      const addLine = (p1, p2, color='#90caf9') => {
        const series = this.chart.addLineSeries({ color, lineWidth:2 });
        series.setData([p1,p2]);
        const id = this.trendLineManager.nextTrendId++;
        this.trendLineManager.list.push({id, series, color, data:[p1,p2]});
        return id;
      };

      // 模拟 3 条趋势线
      addLine({ time:this.data[3].time, value:this.data[3].close*0.95 },
        { time:this.data[10].time, value:this.data[10].close*1.05 }, '#26a69a');
      addLine({ time:this.data[8].time, value:this.data[8].close*0.97 },
        { time:this.data[20].time, value:this.data[20].close*1.15 }, '#ef5350');
      addLine({ time:this.data[12].time, value:this.data[12].close*0.90 },
        { time:this.data[25].time, value:this.data[25].close*1.25 }, '#90caf9');
    },

    removeTrendLine(id) {
      const idx = this.trendLineManager.list.findIndex(x=>x.id===id);
      if(idx===-1) return;
      this.trendLineManager.list[idx].series.setData([]);
      this.chart.removeSeries(this.trendLineManager.list[idx].series);
      this.trendLineManager.list.splice(idx,1);
    }
  }
};
</script>

<style scoped>
.marker {
  position: absolute; font-size: 12px; color: white;
  background: rgba(0,0,0,0.6); border: 1px solid #444; border-radius: 4px;
  padding: 4px 8px; pointer-events: none; white-space: nowrap; z-index: 10;
  transform: translate(-50%, -100%);
}
.marker.buy { border-color: #26a69a; color: #26a69a; }
.marker.sell { border-color: #ef5350; color: #ef5350; }
.marker.event { border-color: #90caf9; color: #90caf9; }
</style>

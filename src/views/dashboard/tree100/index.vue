<template>
  <div class="wrap">
    <!-- 左侧：目录 -->
    <aside class="left">
      <div class="left__title">Files</div>

      <ul class="tree">
        <TreeNode
          v-for="n in tree"
          :key="n.id"
          :node="n"
          :active-id="activeId"
          @toggle="toggleFolder"
          @openFile="openFile"
        />
      </ul>
    </aside>

    <!-- 右侧：内容 -->
    <main class="right">
      <div class="right__title">
        {{ currentFile ? currentFile.name : "请选择一个文件" }}
      </div>

      <pre v-if="currentFile" class="file-content">
<code>{{ currentFile.content }}</code>
      </pre>

      <div v-else class="empty">点击左侧文件查看内容</div>
    </main>
  </div>
</template>

<script>
/**
 * TreeNode：render 函数递归（runtime-only 兼容）
 */
const TreeNode = {
  name: "TreeNode",
  props: {
    node: Object,
    activeId: [String, Number],
  },
  methods: {
    clickRow() {
      if (this.node.type === "folder") {
        this.$emit("toggle", this.node);
      } else {
        this.$emit("openFile", this.node);
      }
    },
  },
  render(h) {
    const isFolder = this.node.type === "folder";
    const isOpen = !!this.node.open;
    const isActive = this.node.id === this.activeId;

    return h("li", { class: "item" }, [
      h(
        "div",
        {
          class: ["row", isActive && "is-active"],
          on: { click: this.clickRow },
        },
        [
          h(
            "span",
            { class: "icon" },
            isFolder ? (isOpen ? "📂" : "📁") : "📄"
          ),
          h("span", { class: "name" }, this.node.name),
        ]
      ),

      isFolder && isOpen
        ? h(
          "ul",
          { class: ["tree", "tree--child"] },
          this.node.children.map((c) =>
            h("TreeNode", {
              key: c.id,
              props: {
                node: c,
                activeId: this.activeId,
              },
              on: {
                toggle: (f) => this.$emit("toggle", f),
                openFile: (f) => this.$emit("openFile", f),
              },
            })
          )
        )
        : null,
    ]);
  },
};

export default {
  name: "FileBrowser",
  components: { TreeNode },
  data() {
    return {
      activeId: null,
      currentFile: null,
      tree: [
        {
          id: "docs",
          type: "folder",
          name: "docs",
          open: false,
          children: [
            {
              id: "readme",
              type: "file",
              name: "README.md",
              content: "# README\n\n这是一个示例 markdown 文件。",
            },
            {
              id: "guide",
              type: "folder",
              name: "guide",
              open: false,
              children: [
                {
                  id: "install",
                  type: "file",
                  name: "install.md",
                  content:
                    "## 安装\n\nnpm install\nnpm run dev",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    toggleFolder(folder) {
      folder.open = !folder.open;
    },
    openFile(file) {
      this.activeId = file.id;
      this.currentFile = file;
    },
  },
};
</script>

<style scoped>
.wrap {
  display: flex;
  height: 100vh;
}
.left {
  width: 260px;
  border-right: 1px solid #eee;
  overflow: auto;
}
.left__title {
  padding: 12px;
  font-weight: 600;
  border-bottom: 1px solid #eee;
}
.right {
  flex: 1;
  overflow: auto;
}
.right__title {
  padding: 12px 16px;
  font-weight: 600;
  border-bottom: 1px solid #eee;
}
.empty {
  padding: 16px;
  color: #888;
}

/* tree */
.tree {
  list-style: none;
  padding: 8px;
  margin: 0;
}
.tree--child {
  padding-left: 16px;
}
.row {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  cursor: pointer;
  border-radius: 6px;
}
.row:hover {
  background: #f6f6f6;
}
.row.is-active {
  background: #e6f7ff;
}
.icon {
  width: 22px;
  text-align: center;
  margin-right: 6px;
}
.name {
  font-size: 14px;
}

/* 文件内容 */
.file-content {
  padding: 16px;
  margin: 0;
  white-space: pre-wrap;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
  "Liberation Mono", "Courier New", monospace;
  font-size: 14px;
  line-height: 1.6;
}
</style>

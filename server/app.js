// server/app.js
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const sequelize = require('./config/db')
const User = require('./models/User')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// === 初始化数据库 ===
;(async () => {
  await sequelize.sync({ alter: true })
  console.log('✅ 数据库同步完成')
})()

// === C: 创建 ===
app.post('/api/users', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

// === R: 查询全部 ===
app.get('/api/users', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

// === U: 更新 ===
app.put('/api/users/:id', async (req, res) => {
  await User.update(req.body, { where: { id: req.params.id } })
  const updated = await User.findByPk(req.params.id)
  res.json(updated)
})

// === D: 删除 ===
app.delete('/api/users/:id', async (req, res) => {
  await User.destroy({ where: { id: req.params.id } })
  res.json({ deleted: true })
})

// === 启动服务 ===
const PORT = 3001
app.listen(PORT, () => console.log(`🚀 后端已启动：http://localhost:${PORT}`))

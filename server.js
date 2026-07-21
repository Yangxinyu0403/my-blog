const express = require('express');
const app = express();
const port = 3000;

// 允许跨域
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());

// ===== 文章数据（写死在内存里） =====
const posts = [
    {
        id: 1,
        title: '今天学了数据库',
        body: '数据库基础：SQL语句的分类，通用语法及操作',
        date: '2026-07-17',
        comments: ['加油！我也是从零开始的', '一起学习呀']
    },
    {
        id: 2,
        title: 'JavaScript 比想象中有趣',
        body: '今天用 JS 做了一个点击按钮弹出提示的小功能，虽然很简单，但看到页面有反应的那一刻真的好有成就感。',
        date: '2026-07-17',
        comments: ['哈哈哈哈我也是！', '继续坚持，后面会越来越有意思']
    }
];

// ===== 测试接口 =====
app.get('/api/hello', (req, res) => {
    res.json({ message: '后端跑通了!' });
});

// ===== 获取文章列表 =====
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// ===== 接收前端发布的新文章 =====
app.post('/api/posts', (req, res) => {
    const { title, body, date, comments } = req.body;

    if (!title || !body) {
        return res.status(400).json({ error: '标题和正文都不能为空' });
    }

    const newId = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;
    const newPost = {
        id: newId,
        title: title,
        body: body,
        date: date || new Date().toISOString().slice(0, 10),
        comments: comments || []
    };

    posts.push(newPost);
    res.status(201).json(newPost);
});

// ===== 启动服务器 =====
app.listen(port, () => {
    console.log(`✅ 后端服务已启动：http://localhost:${port}`);
});
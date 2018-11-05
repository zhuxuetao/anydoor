module.exports = (totalSize, req, res) => {
    const range = req.headers['range'];
    // 如果拿不到range   直接返回状态200
    if (!range) {
        return { code: 200 }
    }

    const size = range.match(/bytes=(\d*)-(\d*)/);
    console.info('size:', size)
    const end = size[2] || totalSize - 1;
    const start = size[1] || totalSize - end;

    if (start > end || start < 0 || end > totalSize) {
        return { code: 200 }
    }

    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Content-Range', `bytes ${start}-${end}/${totalSize}`);
    res.setHeader('Content-Length', end - start);
    return {
        code: 206,
        start: parseInt(start),
        end: parseInt(end)
    }
}
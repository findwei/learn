const fs = require('fs');
const { Client } = require('ssh2');

const localFilePath = '/path/to/local/file';
const remoteFilePath = '/www/wwwroot/webber';
const remoteHost = 'admin.webber.run';
const remotePort = 21;
const remoteUsername = 'webber';
const remotePassword = '';

const conn = new Client();
conn.on('ready', function () {
    console.log('已连接到远程服务器');
    conn.sftp(function (err, sftp) {
        if (err) {
            console.error('SFTP 连接失败:', err);
            conn.end();
            return;
        }
        console.log('已连接到 SFTP 服务器');
        const readStream = fs.createReadStream(localFilePath);
        const writeStream = sftp.createWriteStream(remoteFilePath);
        writeStream.on('close', function () {
            console.log('文件上传成功');
            conn.end();
        });
        writeStream.on('error', function (err) {
            console.error('文件上传失败:', err);
            conn.end();
        });
        readStream.pipe(writeStream);
    });
}).connect({
    host: remoteHost,
    port: remotePort,
    username: remoteUsername,
    password: remotePassword
});
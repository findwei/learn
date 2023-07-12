const fs = require('fs');
const ftp = require('ftp');
const path = require('path');

const localFolderPath = './ftp';
const remoteFolderPath = '/www/wwwroot/webber';
// const remoteFolderPath = '/';
const remoteHost = 'admin.webber.run';
// const remoteHost = '124.221.226.175';
const remotePort = 21;
const remoteUsername = 'webber';
const remotePassword = 'pK5sfbmijfN7tnEx';

const client = new ftp();
client.on('ready', function () {
    console.log('已连接到 FTP 服务器');
    // client.put(localFilePath, remoteFilePath, function (err) {
    //     if (err) {
    //         console.error('文件上传失败:', err);
    //     } else {
    //         console.log('文件上传成功');
    //     }
    //     client.end();
    // });
    uploadFolder(localFolderPath, remoteFolderPath, function () {
        console.log('文件夹上传完成');
        client.end();
    });
});
client.on('error', function (err) {
    console.error('连接错误:', err);
});
client.connect({
    host: remoteHost,
    port: remotePort,
    user: remoteUsername,
    password: remotePassword,
    // secure: true, // 启用 SSL/TLS 认证
    // secureOptions: {
    //     rejectUnauthorized: false // 忽略证书验证错误
    // }
});

function uploadFolder(localFolderPath, remoteFolderPath, callback) {
    fs.readdir(localFolderPath, function (err, files) {
        if (err) {
            console.error('读取文件夹失败:', err);
            callback();
            return;
        }
        let count = files.length;
        if (count === 0) {
            callback();
            return;
        }
        files.forEach(function (file) {
            const localFilePath = path.join(localFolderPath, file);
            const remoteFilePath = path.join(remoteFolderPath, file);
            fs.stat(localFilePath, function (err, stats) {
                if (err) {
                    console.error('读取文件状态失败:', err);
                    count--;
                    if (count === 0) {
                        callback();
                    }
                    return;
                }
                if (stats.isFile()) {
                    console.log(localFilePath, remoteFilePath)
                    client.put(localFilePath, remoteFilePath, function (err) {
                        if (err) {
                            console.error('文件上传失败:', err);
                        } else {
                            console.log('文件上传成功:', localFilePath);
                        }
                        count--;
                        if (count === 0) {
                            callback();
                        }
                    });
                } else if (stats.isDirectory()) {
                    client.mkdir(remoteFilePath, function (err) {
                        if (err) {
                            console.error('创建文件夹失败:', err);
                            count--;
                            if (count === 0) {
                                callback();
                            }
                            return;
                        }
                        uploadFolder(localFilePath, remoteFilePath, function () {
                            console.log('文件夹上传成功:', localFilePath);
                            count--;
                            if (count === 0) {
                                callback();
                            }
                        });
                    });
                }
            });
        });
    });
}
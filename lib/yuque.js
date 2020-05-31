'use strict';
const urllib = require('urllib');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const team = process.env.TEAM || 'easy-team';

exports.getSpaceUrl = function(space) {
  return `https://www.yuque.com/api/v2/repos/${team}/${space}/docs`
}

exports.getDocUrl= function(space, slug) {
  return `https://www.yuque.com/api/v2/repos/${team}/${space}/docs/${slug}?raw=1`;
}

exports.request = async function (url, options = {}) {
  return new Promise((resolve, reject) => {
    const headers = {
      'X-Auth-Token': process.env.YUE_TOKEN
    };
    urllib.request(url, { headers, timeout: 30000, ...options }, function (err, data, res) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    });
  });
}

exports.processDocImage = async function (space, doc) {
  const imgReg = /!\[(.*?)\]\((.*?)\)/mg;
  const imageList = [];
  let matcher;

  while ((matcher = imgReg.exec(doc.body)) !== null) {
    imageList.push({
      name: matcher[1],
      url: matcher[2]
    });
  }
  const basedir = `./themes/easy-team/source/medias/easyjs/${space}`;
  const imgPrefix = `/medias/easyjs/${space}`;
  const dir = path.resolve(__dirname, '..', basedir);
  mkdirp.sync(dir);
  for(let img of imageList) {
    const buffer = await exports.request(img.url);
    const random = Math.ceil(Math.random() * 10000000);
    const ext = img.name ? path.extname(img.name) : '.png';
    const basename = img.name ? `${img.name.replace(ext, '')}-${random}` : random;
    const uniqueImageName = `${space}-${doc.slug}-${basename}${ext}`;
    fs.writeFileSync(`${basedir}/${uniqueImageName}`, buffer);
    doc.body = doc.body.replace(img.url, `${imgPrefix}/${uniqueImageName}`);
  }
  console.log('imageList:\r\n', imageList);
  return doc;
}

exports.createFile = async function(space, doc, root = 'tmp') {
  await exports.processDocImage(space, doc);
  const dir = path.resolve(__dirname, `../${root}/_posts`, space);
  const filepath = path.join(dir, `${doc.slug}.md`);
  mkdirp.sync(dir);
  doc.body = doc.body.replace(/<a name="[0-9a-zA-z]*"><\/a>/g, '');
  const md = `
---
id: ${doc.id}
space: ${space}
slug: ${doc.slug}
url: /${space}/${doc.slug}
title: ${doc.title}
summary: ${doc.description}
coverImage: ${doc.cover}
createTime: ${doc.published_at} 
upateTime: ${doc.updated_at}
wordCount: ${doc.word_count}
layout: doc
---
${doc.body}
  `
  fs.writeFileSync(filepath, md);
  return {
    filepath,
    fileinfo: {
      id: doc.id,
      space: space,
      slug: doc.slug,
      url: `/${space}/${doc.slug}`,
      title: doc.title,
      summary: doc.description,
      coverImage: doc.cover,
      createTime: doc.published_at,
      updateTime: doc.updated_at,
      wordCount: doc.word_count
    }
  };
}

exports.createDoc = async function (space, slug, root) {
  const docUrl = exports.getDocUrl(space, slug);
  const res = await exports.request(docUrl, { dataType: 'json' });
  console.log(res);
  return await exports.createFile(space, res.data, root);
}

exports.createSpace = async function (space, docs) {
  const list = docs.map(doc => {
    return {
      id: doc.id,
      space: space,
      slug: doc.slug,
      url: `/${space}/${doc.slug}`,
      title: doc.title,
      summary: doc.description,
      coverImage: doc.cover,
      createTime: doc.published_at,
      updateTime: doc.updated_at,
      wordCount: doc.word_count
    }
  });
  list.sort((a, b) => {
    if (a.id > b.id) {
      return 1;
    }
    return -1;
  });
  const dir = path.resolve(__dirname, '../tmp/_data');
  const filepath = `${dir}/${space}.json`;
  mkdirp.sync(dir);
  fs.writeFileSync(filepath, JSON.stringify(list, null, 2));
}

exports.createSpaceDocs = async function (space) {
  const spaceUrl = exports.getSpaceUrl(space);
  const res = await exports.request(spaceUrl, { dataType: 'json' });
  const docs = (res.data || []).filter(doc => {
    return doc.status === 1 && doc.public === 1 && doc.word_count > 0;
  });
  const promises = docs.map(doc => {
    return exports.createDoc(space, doc.slug);
  });
  console.log(`>>${space} 空间共有${promises.length}篇文档`);
  promises.push(exports.createSpace(space, docs));
  await Promise.all(promises);
}


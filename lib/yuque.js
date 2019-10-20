'use strict';
const urllib = require('urllib');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const team = process.env.TEAM || 'easy-team';
function getSpaceUrl(space) {
 const team = process.env.TEAM || 'easy-team';
 return `https://www.yuque.com/api/v2/repos/${team}/${space}/docs`
}

function getDocUrl(space, slug) {
  return `https://www.yuque.com/api/v2/repos/${team}/${space}/docs/${slug}?raw=1`;
 }


async function request(url, options) {
  return new Promise((resolve, reject) => {
    urllib.request(url, options, function (err, data, res) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    });
  });
}

async function createFile(space, doc) {
  const dir = path.resolve(__dirname, '../tmp/_posts', space);
  const filepath = path.join(dir, `${doc.slug}.md`);
  mkdirp.sync(dir);
  const body = doc.body.replace(/<a name="[0-9a-zA-z]*"><\/a>/g, '');
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
${body}
  `
  fs.writeFileSync(filepath, md);
}

async function createDoc(space, doc) {
  const docUrl = getDocUrl(space, doc.slug);
  const res = await request(docUrl, { dataType: 'json' });
  await createFile(space, res.data);
}

async function createSpace(space, docs) {
  const list = docs.map(doc => {
    return  {
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

async function noop() {}

async function createSpaceDocs(space) {
  const spaceUrl = getSpaceUrl(space);
  const res = await request(spaceUrl, { dataType: 'json' });
  const docs = (res.data || []).filter(doc => {
    return doc.status ===1 && doc.public ===1 && doc.word_count >0;
  });
  const promises = docs.map(doc => {
    return createDoc(space, doc);
  });
  console.log(`>>${space} 空间共有${promises.length}篇文档`);
  promises.push(createSpace(space, docs));
  await Promise.all(promises);
}

createSpaceDocs(process.env.SPACE);
const yuque = require('./yuque');

const args = process.argv;
if (process.env.SPACE) {
  yuque.createSpaceDocs(process.env.SPACE);
} else if (args.length >= 4) {
  // npm run easyjs -s egg-vue -d learn
  // npm run sky -s blog -d learn
  yuque.createDoc(args[2], args[3], 'source').then(({ filepath, fileinfo }) => {
    console.log(filepath);
    console.log(JSON.stringify(fileinfo, null, 2));
  });
}

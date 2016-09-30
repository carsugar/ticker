const aws = require('aws-sdk');
require('dotenv').config();

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

module.exports = {
  getSignedUrl: (req, res) => {
    const s3 = new aws.S3();

    const params = {
      Bucket: 'pivottechnologies',
      Key: req.query.filename,
      Expires: 60,
      ContentType: req.query.filetype
    };

    s3.getSignedUrl('putObject', params, (err, data) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log('Signed URL:', data);
        res.send(data);
      }
    });
  }
};

import React from 'react';
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'row',
  },

  social: {
    padding: '5px',
  }
}

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const EmailIcon = generateShareIcon('email');

const Social = () => {
  return (
    <div style={style.container}>
      <FacebookShareButton style={style.social}
                           quote="Check out my habit progress on reHabit!"
                           url={window.location.href}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <TwitterShareButton style={style.social}
                          title="Check out my habit progress on reHabit!"
                          url={window.location.href}>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <GooglePlusShareButton style={style.social} url={window.location.href}>
        <GooglePlusIcon size={32} round={true} />
      </GooglePlusShareButton>
      <LinkedinShareButton style={style.social}
                           description="Check out my habit progress on reHabit!"
                           url={window.location.href}>
        <LinkedinIcon size={32} round={true} />
      </LinkedinShareButton>
      <EmailShareButton style={style.social}
                        subject="Check out my habit progress on reHabit!"
                        url={window.location.href}>
        <EmailIcon size={32} round={true} />
      </EmailShareButton>
    </div>
  )
}

export default Social;
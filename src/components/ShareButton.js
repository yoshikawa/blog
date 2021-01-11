import React from "react";
import styled from 'styled-components'
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LineShareButton,
  LineIcon
} from "react-share";
import urljoin from "url-join";
import config from "../../data/siteConfig";

const ShareContainer = styled.div`
  & > button {
    margin: 0rem 1.6rem 1rem 0rem;
  }
`

class Share extends React.Component {
  render() {
    const { post } = this.props;
    const url = urljoin(config.siteUrl, post.frontmatter.slug);
    const mobile = this.props.mobile;
    const iconSize = mobile ? 28 : 36;

    return (
      <ShareContainer>
        <TwitterShareButton url={url} title={post.frontmatter.title}>
          <TwitterIcon round size={iconSize} />
        </TwitterShareButton>
        <FacebookShareButton url={url} quote={post.excerpt}>
          <FacebookIcon round size={iconSize} />
        </FacebookShareButton>
        <LineShareButton url={url} quote={post.excerpt}>
          <LineIcon round size={iconSize} />
        </LineShareButton>
      </ShareContainer>
    );
  }
}

export default Share;
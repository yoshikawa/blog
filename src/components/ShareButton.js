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
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  width: 100%;
`

const Share = props => {
    const url = urljoin(config.siteUrl, props.slug);
    const mobile = props.mobile;
    const iconSize = mobile ? 28 : 36;
    
    return (
        <ShareContainer>
          <TwitterShareButton url={url} title={props.title}>
            <TwitterIcon round size={iconSize} />
          </TwitterShareButton>
          <FacebookShareButton url={url} quote={props.excerpt}>
            <FacebookIcon round size={iconSize} />
          </FacebookShareButton>
          <LineShareButton url={url} quote={props.excerpt}>
            <LineIcon round size={iconSize} />
          </LineShareButton>
        </ShareContainer>
    );
}

export default Share;
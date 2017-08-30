import React, { Component } from 'react';
import { connect } from 'react-redux';


class MyMemes extends Component {
  render() {
    return (
      <div>
        {
          this.props.myMemes.map((meme,index) => {
            return (
              <div id="my-meme" key={index}>
                <img
                  src={meme.data.url}
                  alt="my-meme"
                  className="my-meme-img"
                />
              <a
                className="my-meme-download"
                href={meme.data.url}
                download="meme_generator"
              > Download
              </a>
            </div>
            )
          })
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    myMemes: state.myMemes
  }
}

export default connect(mapStateToProps, null)(MyMemes);

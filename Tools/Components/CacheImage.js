import React from 'react';
import { ImageBackground,Image } from 'react-native';
import shorthash from 'shorthash';
import * as FileSystem from 'expo-file-system';

export default class CacheImage extends React.Component {
  state = {
    source: null,
  };
  
  
  componentDidMount = async () => {
    const { uri } = this.props;
    const name = shorthash.unique(uri);
    // console.log(name);
    const path = `${FileSystem.cacheDirectory}${name}`;
    const image = await FileSystem.getInfoAsync(path);
    if (image.exists)
     {
      // console.log('read image from cache');
      this.setState({
        source: {
          uri: image.uri,
        },
      });
      this.imagedone();
      return;
    }
  
    // console.log('downloading image to cache'+uri);
    const newImage = await FileSystem.downloadAsync(uri, path);
    this.setState({
      source: {
        uri: newImage.uri,
      },
    });
    this.imagedone();
  };

  imagedone(){
    var done=this.props.onDone;
    if(done!==undefined){
      done();
      console.log("Done");
    }
  }
  
  
  render() {
    if(this.props.bg)
    return <ImageBackground style={this.props.style} source={this.state.source} />;
    else
    return <Image style={this.props.style} source={this.state.source} />;
  }
}
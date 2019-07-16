import   PropTypes from 'prop-types';
import  {requireNativeComponent,View} from 'react-native';
const VideoView = {
    name:'VideoView',
    propTypes:{
        style: PropTypes.style,
        source:PropTypes.shape({
            url:PropTypes.string,
            headers:PropTypes.object,
        }),
        ...View.propTypes,//包含默认的View的属性，如果没有这句会报‘has no propType for native prop’错误
    }
};

const RCTVideoView=requireNativeComponent('VideoView',VideoView);
module.exports=RCTVideoView;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';


import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import Video from 'react-native-af-video-player';
import MyTab from "./Component/MyTab";
import VideoView from './Component/VideoView';
type Props = {};

export default class App extends Component<Props> {
    constructor(Props) {
        super(Props);
        this.state = {
            tabNames: ['JS播放器', '安卓播放器','关于'],
            tabIconNames: ['logo-youtube','logo-android', 'md-reorder']
        };
    }

    render() {
        let tabNames = this.state.tabNames;
        let tabIconNames = this.state.tabIconNames;
        return (
            <ScrollableTabView
                renderTabBar={()=><MyTab tabNames={tabNames} tabIconNames={tabIconNames}/> }

                tabBarPosition={'bottom'}

                onChangeTab={
                (obj) => {
                   console.log('选中的tab下标：'+obj.i);
                }
            }
                onScroll={
                    (position)=>{
                        console.log('滑动时的位置：'+position);
                    }
                }

                locked={false}
                initialPage={0}
                prerenderingSiblingsNumber={1}
              >
            <View style={styles.tab} tabLabel="key1" >
                <Video
                    ref={(ref) => {
                        this.player = ref
                    }}
                    onBuffer={this.onBuffer}
                    onError={this.onError}
                    style={styles.backgroundVideo}
                    url={"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"}
                />
            </View>

                <View style={styles.tab} tabLabel="key2">
                    <VideoView
                        style={{height:250,width:380}}
                        source={
                            {
                                url:"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
                                headers:{
                                    'refer':'myRefer'
                                }
                            }
                        }

                    />
                </View>
                <View style={styles.tab} tabLabel="key3">
                    <Text>关于</Text>
                </View>
            </ScrollableTabView>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    tab:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#EBEBEB',
        flex: 1
    }
});

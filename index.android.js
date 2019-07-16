/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import Video from 'react-native-af-video-player';

import MyTab from "Component/MyTab";

type Props = {};

export default class App extends Component<Props> {

    constructor(Props) {
        super(Props);
        this.state = {
            tabNames: ['JS播放器', '关于'],
            tabIconNames: ['logo-youtube', 'md-reorder']
        }
    }

    render() {
        let tabNames = this.state.tabNames;
        let tabIconNames = this.state.tabIconNames;
        return (

            <ScrollableTabView
                renderTabBar={()=><MyTab tabNames={tabNames} tabIconNames={tabIconNames}/> }
                tabBarPosition={'bottom'}>

            <View style={styles.tab} tabLabel={"key1"}>
                <Video   // Can be a URL or a local file.
                    ref={(ref) => {
                        this.player = ref
                    }}                                      // Store reference
                    onBuffer={this.onBuffer}                // Callback when remote video is buffering
                    onError={this.onError}
                    style={styles.backgroundVideo}
                    url={"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4npm"}
                />
            </View>
                <View style={styles.tab} tabLabel={"key2"}>
                    <Video   // Can be a URL or a local file.
                        ref={(ref) => {
                            this.player = ref
                        }}                                      // Store reference
                        onBuffer={this.onBuffer}                // Callback when remote video is buffering
                        onError={this.onError}
                        style={styles.backgroundVideo}
                        url={"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4npm"}
                    />
                </View>
            </ScrollableTabView>
        )
        ;
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

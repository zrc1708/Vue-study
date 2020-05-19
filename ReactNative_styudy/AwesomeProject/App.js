import React, { Component } from 'react'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// 第三方tabbar组件
import TabNavigator from 'react-native-tab-navigator';

// 导入tab栏的组件
import Home from './components/tabbars/Home.js'
import Me from './components/tabbars/Me.js'
import Search from './components/tabbars/Search.js'
import ShopCar from './components/tabbars/ShopCar.js'

// 导入图标相关的组件
import Icon from 'react-native-vector-icons/FontAwesome';


export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
          selectedTab:'home',   //选中的tab栏名称
        }
    }

    render() {
        return (
            <View style = {styles.container}>
                {/* tab */}
                <TabNavigator>
                    {/* 主页的tab栏 */}
                    <TabNavigator.Item
                      selected={this.state.selectedTab === 'home'}  //判断当前的tab是否被选
                      title="Home"
                      renderIcon={() => <Icon name="home" size={25} color="gray" />}
                      renderSelectedIcon={() => <Icon name="home" size={25} color="#0079ff" />}
                      onPress={() => this.setState({ selectedTab: 'home' })}  //tab点击事件
                      >
                        <Home></Home>
                    </TabNavigator.Item>

                    {/* 搜索的tab栏 */}
                    <TabNavigator.Item
                      selected={this.state.selectedTab === 'search'}
                      title="搜索"
                      renderIcon={() => <Icon name="search" size={25} color="gray" />}
                      renderSelectedIcon={() => <Icon name="search" size={25} color="#0079ff" />}
                      // renderBadge={() => <CustomBadgeView />}
                      onPress={() => this.setState({ selectedTab: 'search' })}
                      >
                        <Search></Search>
                    </TabNavigator.Item>

                    {/* me的tab栏  */}
                    <TabNavigator.Item
                      selected={this.state.selectedTab === 'me'}
                      title="购物车"
                      renderIcon={() => <Icon name="shopping-cart" size={25} color="gray" />}
                      renderSelectedIcon={() => <Icon name="shopping-cart" size={25} color="#0079ff" />}
                      // renderBadge={() => <CustomBadgeView />}
                      badgeText="0"
                      onPress={() => this.setState({ selectedTab: 'me' })}
                      >
                        <Me></Me>
                    </TabNavigator.Item>

                    {/* 购物车的tab栏 */}
                    <TabNavigator.Item
                      selected={this.state.selectedTab === 'shopcar'}
                      title="Me"
                      renderIcon={() => <Icon name="user" size={25} color="gray" />}
                      renderSelectedIcon={() => <Icon name="user" size={25} color="#0079ff" />}
                      // renderBadge={() => <CustomBadgeView />}
                      onPress={() => this.setState({ selectedTab: 'shopcar' })}
                      >
                        <ShopCar></ShopCar>
                    </TabNavigator.Item>
                  </TabNavigator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
      flex:1
    }
});

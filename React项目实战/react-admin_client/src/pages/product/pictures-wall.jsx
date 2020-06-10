// 用于图片上传的组件
import React, { Component } from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqDeleteImg} from '../../api/index'
import {BASE_IMG_URL} from '../../utils/constants'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,  //标识是否显示大图预览
    previewImage: '',   //大图的url
    previewTitle: '',
    fileList: [],
  };

  constructor(props){
        super(props)

        let fileList = []

        // 如果传入了imgs属性
        const {imgs} = this.props
        if(imgs&&imgs.length>0){
            fileList = imgs.map((img,index)=>({
                uid: -index,
                name: img,
                status: 'done',
                url: BASE_IMG_URL+img,
            }))
        }

        //初始化状态
        this.state = {
          previewVisible:false,
          previewImage:'',
          fileList
        }
  }

//   获取所有已上传文件名的数组
  getImgs = () => {
    return this.state.fileList.map(file=>file.name)
  } 

//隐藏model
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    // 显示指定file对应的大图
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = async ({ file,fileList }) => {
    // 一旦上传成功，将当前上传的file星系进行修正
    if(file.status==='done'){
        const result = file.response
        if(result.status===0){
            message.success('上传图片成功')
            const  {name,url} = result.data
            file = fileList[fileList.length-1]
            file.name = name
            file.url = url.replace('localhost','39.100.225.255')
        }else{
            message.error('上传图片失败')
        }
    }else if(file.status==='removed'){
        const result = await reqDeleteImg(file.name)
        if(result.status===0){
            message.success('删除图片成功')
        }else{
            message.error('删除图片失败')
        }
    }

    // 在上传,删除过程中，更新filelist状态
    this.setState({ fileList })
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload"
          accept="image/*"      //只接受图片格式
          name="image"      //请求的参数名
          listType="picture-card"   //卡片样式
          fileList={fileList}   //所有已上传文件列表
          onPreview={this.handlePreview}    //点击文件链接或预览图标时的回调
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}


import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class RichTextEditor extends Component {

  constructor (props) { 
    super(props) // 根据传入的 html 文本初始显示 

    const html = this.props.detail 
    if(html){
        // 如果有值，根据HTML格式的字符串创建一个对应的编辑对象
        const contentBlock = htmlToDraft(html) 
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks) 
        const editorState = EditorState.createWithContent(contentState)
        this.state = { editorState } 
    }else{
        this.state ={ editorState: EditorState.createEmpty() }
    }
  }

//   上传图片
  uploadImageCallBack=(file)=> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/manage/img/upload');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          const url = response.data.url.replace('localhost','39.100.225.255')   //得到图片url
          resolve({ data: {link:url}});
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }

//   输入过程中实时的回调
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

// 分会输入数据对应的HTML文本
getDetail =()=>{
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
}

  render() {
    const { editorState } = this.state;
    return (
        <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={this.onEditorStateChange}
        toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
        }}
        editorStyle={{border:'1px solid #d9d9d9',minHeight:200,padding:'0 10px'}}/>
    );
  }
}
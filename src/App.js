import React ,{Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';


const initialState={
  input:'',
  imageUrl:'',
  box:{},
  route:'signin',
  user:{
    id:'',
    name:'',
    email:'',
    password:'',
    entries:0,
    joined:''
  }
}
class App extends Component{
  constructor(){
    super();
    this.state=initialState
  }
loadUser=(data)=>{
  this.setState({user:{
    id: data.id,
    name: data.name,
    email: data.email,
    password: data.password,
    entries: data.entries,
    joined: data.joined
  }})
}

faceDetect=(data)=>{
  const obj=data.outputs[0].data.regions[0].region_info.bounding_box;
  const image= document.getElementById('inputImage');
  const height=image.height;
  const width=image.width;
  return{
    topRow:obj.top_row*height,
    botRow:height-(obj.bottom_row*height),
    leftCol:obj.left_col*width,
    rightCol:width-(obj.right_col*width)
  }
}

faceBox=(obj)=>{
  this.setState({box:obj})
}
onInputChange=(event)=>{
  this.setState({input:event.target.value})
}

onSubmit=()=>{
  this.setState({imageUrl:this.state.input})
  fetch('http://localhost:3000/imageURL',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        input:this.state.input
    })
  })
    .then(response=>response.json())
  .then(response=>{
    fetch('http://localhost:3000/image',{
      method:'put',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        id:this.state.user.id
    })
    })
    .then(response=>response.json())
    .then(data=>{
      this.setState(Object.assign(this.state.user,{entries:data}))
    })
    .catch(console.log)
    this.faceBox(this.faceDetect(response))
  })
  .catch(err=>console.log(err))
}

onRouteChange=(route)=>{
  if(route==='signin'){
    this.setState(initialState)
  }
this.setState({route:route})
}
  render(){
  return (
    <div className="App">
      <Navigation routePage={this.state.route} onRouteChange={this.onRouteChange}/>
      {
        this.state.route==='home'
        ?<div>
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
        :(
          this.state.route==='signin'
          ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
      }
    </div>
  );
  }
}

export default App;

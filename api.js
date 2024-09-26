const { canvasToken, canvasBaseUrl } = require('./config.json');

  async function getCourses(){
    let response = await fetch('https://'+canvasBaseUrl+'/api/v1/courses?include[]=term&enrollment_state=active',{
      method: 'GET',
      mode: 'cors',
      headers:{
          'Authorization': 'Bearer '+ canvasToken
      }
  });

    if (response.ok) {
      return response.json();
    }
    else if (response.status === 401) {
      this.setToken(null);
    }
    else {
      
      throw response.json();
    }
  }

  async function getAssignments(courseID,bucket){
    let response = await fetch('https://'+canvasBaseUrl+'/api/v1/courses/'+courseID+'/assignments?bucket='+bucket,{
      method: 'GET',
      mode: 'cors',
      headers:{
          'Authorization': 'Bearer '+ canvasToken
      }
  });

    if (response.ok) {
      return response.json();
    }
    else if (response.status === 401) {
      this.setToken(null);
    }
    else {
      
      throw response.json();
    }
  }

  async function getAssignments(courseID){
    let response = await fetch('https://'+canvasBaseUrl+'/api/v1/courses/'+courseID+'/assignments',{
      method: 'GET',
      mode: 'cors',
      headers:{
          'Authorization': 'Bearer '+ canvasToken
      }
  });

    if (response.ok) {
      return response.json();
    }
    else if (response.status === 401) {
      this.setToken(null);
    }
    else {
      
      throw response.json();
    }
  }

  async function getAssignment(courseID, assignmentID){
    let response = await fetch('https://'+canvasBaseUrl+'/api/v1/courses/'+courseID+'/assignments/'+assignmentID,{
      method: 'GET',
      mode: 'cors',
      headers:{
          'Authorization': 'Bearer '+ canvasToken
      }
  });

    if (response.ok) {
      return response.json();
    }
    else if (response.status === 401) {
      this.setToken(null);
    }
    else {
      
      throw response.json();
    }
  }

  function unHTTP(text){
    text = text.replaceAll('<h1>','# ');
    text = text.replaceAll('<h2>','## ');
    text = text.replaceAll('<h3>','## ');
    text = text.replaceAll('<h4>','### ');
    text = text.replaceAll('<h5>','### ');
    text = text.replaceAll('<ul>',' ');
    text = text.replaceAll('</ul>',' ');
    text = text.replaceAll('<li>','-');
    text = text.replaceAll('<p>','');
    text = text.replaceAll('</p>','\n');
    text = text.replaceAll('<strong>','**');
    text = text.replaceAll('</strong>','**');
    text = text.replaceAll('<em>','*');
    text = text.replaceAll('</em>','*');

   // text = text.replaceAll('<a>','');

    text = text.replace(/<[^>]*>?/gm,'');
    text = text.replaceAll('&nbsp;','');
   // console.log(text);
    return text;
  }

  module.exports = {getCourses, getAssignments, getAssignment, unHTTP};
import { React, Component } from "react";
import Form from "./component/Form";
import Control from "./component/Control";
import ListStudent from "./component/ListStudent";

class App extends Component {
  constructor(props) {
    super(props);
    //Khoi tao state chua mock data danh sach sinh vien
    this.state = {
      students: [
        { studentId: 'SV001', studentName: 'Nguyễn Văn A', age: 20, sex: true, birthDate: '2000-04-15', birthPlace: 'HN', address: '25, Vũ Ngọc Phan' },
        { studentId: 'SV002', studentName: 'Nguyễn Văn B', age: 22, sex: false, birthDate: '1999-05-26', birthPlace: 'DN', address: '1, Phan Bội Châu' },
        { studentId: 'SV003', studentName: 'Nguyễn Văn C', age: 19, sex: true, birthDate: '2001-04-25', birthPlace: 'TPHCM', address: '5, Lý Tự Trọng' }
      ],
      isToggle: false,
      actionName: '',
      searchData: '',
      orderDir: '',
      orderBy: '' ,
      selectedStudent:{}
    }
  }
  handleClickNewSt = (toggle, actionNameParam) => {
    //xu ly nhan du lieu tu component con - Control - set state isToggle
    this.setState({
      isToggle: toggle,
      actionName: actionNameParam
    })
  }
  handleClickSubmitForm = (toggle) => {
    //Xy ly nhan du lieu con - Form - set state isToggle
    this.setState({
      isToggle: toggle
    })
  }
  handleClickViewEdit = (toggle, actionNameParam, selectedStudentParam) => {   
    this.setState({
      isToggle: toggle,
      actionName: actionNameParam,
      selectedStudent:selectedStudentParam
    })
  }
  handleSearch = (searchDataParam) => {
    //Luu tru searchData vao state
    this.setState({
      searchData: searchDataParam
    })
  }
  handleSort = (orderDirParam, orderByParam) => {
    this.setState({
      orderDir: orderDirParam,
      orderBy: orderByParam
    })
  }
  handleCreateNewSt = (studentNew)=>{
    //add studentNew vao this.state.students   
    let studentsNew = [...this.state.students];
    studentsNew.push(studentNew);
    this.setState({
      students:studentsNew
    })
  }
  handleUpdateSt = (studentEdit)=>{
    //xu ly cap nhat thong tin sinh vien
    let {students} = this.state; 
    students.forEach((st,index)=>{
      if (st.studentId===studentEdit.studentId) {
          students[index] = studentEdit;          
      }
    });
    this.setState({
      students: students
    })
  }
  handleClickDelete = (studentId)=>{
    //Xoa studentId trong danh sach sinh vien
    let {students} = this.state;
    let indexDelete=0;
    students.forEach((st,index)=>{
      if (st.studentId===studentId) {
        indexDelete = index;
      }
    })
    students.splice(indexDelete,1);
    this.setState({
      students:students
    })
  }
  render() {
    //Loc du lieu theo tieu chi seach de hien thi tren componet ListStudent
    let students = [];
    if (this.state.searchData == '') {
      students = [...this.state.students];
    } else {
      //Loc du lieu theo tieu chi tim kiem
      this.state.students.forEach((st) => {
        if (st.studentName.toLowerCase().includes(this.state.searchData.toLowerCase())) {
          students.push(st);
        }
      })
    }
    //Sap xep du lieu
    if (this.state.orderDir === 'StudentName') {
      if (this.state.orderBy === 'ASC') {
        students.sort((a, b) => ((a.studentName > b.studentName) ? 1 : (a.studentName > b.studentName) ? -1 : 0));
      } else {
        students.sort((a, b) => ((a.studentName > b.studentName) ? -1 : (a.studentName > b.studentName) ? 1 : 0));
      }
    } else {
      if (this.state.orderBy === 'ASC') {
        //Sap xep tuoi tang dan
        students.sort((a, b) => a.age - b.age);
      } else {
        //Sap xep tuoi giam dan
        students.sort((a, b) => b.age - a.age);
      }
    }
    // let elementFrom = <Form />;
    let elementFrom = '';
    if (this.state.isToggle) {
      elementFrom = <Form clickSubmit={this.handleClickSubmitForm} actionName={this.state.actionName} handleCreateNewSt={this.handleCreateNewSt} selectedStudent = {this.state.selectedStudent} handleEdit={this.handleUpdateSt}/>;
    }
    return (
      // <!-- JSX Student Management Start -->
      <div className="row">
        <div className="col-lg-7 grid-margin stretch-card">
          <div className="card">
            {/* <!-- Control start --> */}
            <Control clickNewStudent={this.handleClickNewSt} handleSearch={this.handleSearch} handleSort={this.handleSort} />
            {/* <!-- Control End --> */}
            {/* <!-- List Student Start --> */}
            <ListStudent students={students} clickViewEdit={this.handleClickViewEdit} clickDelete={this.handleClickDelete}/>
            {/* <!-- List Student End --> */}
          </div>
        </div>
        {/* <!-- Form Start --> */}
        {elementFrom}
        {/* <!-- Form End --> */}
      </div>
    );
  }

}

export default App;

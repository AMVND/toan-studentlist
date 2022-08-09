import { React, Component } from 'react';
class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            studentId:'',
            studentName:'',
            age: '',
            sex: true,
            birthDate:'',
            birthPlace:'',
            address:''      
        }
    }
    handleClickSubmit = (event) => {
        //Dong form
        this.props.clickSubmit(false);
        //Xu ly voi truong hop actionName = 'Create'
        if (this.props.actionName==='create') {
            //Chuyen doi tuong sinh vien moi sang App component
            let studentNew = {
                studentId:this.state.studentId,studentName:this.state.studentName,age:this.state.age,
                sex: this.state.sex, birthDate:this.state.birthDate,birthPlace: this.state.birthPlace, address: this.state.address
            }
            //Chuyen doi tuong studentNew ve App component
            this.props.handleCreateNewSt(studentNew);
        }else if(this.props.actionName==='edit'){
            //xu ly cho truong hop cap nhat thong tin sinh vien
            let studentEdit = {
                studentId:this.state.studentId,studentName:this.state.studentName,age:this.state.age,
                sex: this.state.sex, birthDate:this.state.birthDate,birthPlace: this.state.birthPlace, address: this.state.address
            }
            this.props.handleEdit(studentEdit);
        }
        event.preventDefault();
    }
    handleChange = (event)=>{
        let name = event.target.name;
        let value = event.target.value;
        if (name==='sex') {
            value = (value==='true');
        }
        this.setState({
            [name]:value
        })
    }
    componentWillMount(){
        //set lai state
        let {selectedStudent} = this.props;
        this.setState({
            studentId:selectedStudent.studentId,
            studentName: selectedStudent.studentName,
            age: selectedStudent.age,
            sex:selectedStudent.sex,
            birthDate:selectedStudent.birthDate,
            birthPlace:selectedStudent.birthPlace,
            address:selectedStudent.address
        });
    }
    componentWillReceiveProps(nextProps){
        //set lai state
        let {selectedStudent} = nextProps;
        this.setState({
            studentId:selectedStudent.studentId,
            studentName: selectedStudent.studentName,
            age: selectedStudent.age,
            sex:selectedStudent.sex,
            birthDate:selectedStudent.birthDate,
            birthPlace:selectedStudent.birthPlace,
            address:selectedStudent.address
        });
    }
    render() {
        let checkReadOnly = false;
        let checkStudentId = true;
        let elementBtnSubmit;
        if (this.props.actionName == 'create') {
            checkStudentId = false;
            elementBtnSubmit = <button type="submit" className="btn btn-primary me-2" onClick={this.handleClickSubmit}>
                Create
            </button>
        }else if(this.props.actionName=='edit'){
            elementBtnSubmit = <button type="submit" className="btn btn-primary me-2" onClick={this.handleClickSubmit}>
                Edit
            </button>
        }else{     
            //View
            checkReadOnly = true;       
            elementBtnSubmit = '';
        }
        return (
            <div className="col-5 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title">Thông tin sinh viên</h3>
                        <form className="form-sample">
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Mã sinh viên</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control"  name='studentId' onChange={this.handleChange} value={this.state.studentId} readOnly={checkStudentId}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Tên sinh viên</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" name='studentName' onChange={this.handleChange} value={this.state.studentName} readOnly={checkReadOnly}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Tuổi</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" name='age' onChange={this.handleChange} value={this.state.age} readOnly={checkReadOnly}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Giới tính</label>
                                <div className="col-sm-9">
                                    <select className="form-control" name='sex' onChange={this.handleChange} value={this.state.sex} readOnly={checkReadOnly}>
                                        <option value={true}>Nam</option>
                                        <option value={false}>Nữ</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Ngày sinh</label>
                                <div className="col-sm-9">
                                    <input type={'date'} className="form-control" placeholder="dd/mm/yyyy" name='birthDate' onChange={this.handleChange} value={this.state.birthDate} readOnly={checkReadOnly}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Nơi sinh</label>
                                <div className="col-sm-9">
                                    <select className="form-control" name='birthPlace' onChange={this.handleChange} value={this.state.birthPlace} readOnly={checkReadOnly}>
                                        <option value={'HN'}>Hà Nội</option>
                                        <option value={'TPHCM'}>TP. Hồ Chí Minh</option>
                                        <option value={'DN'}>Đà Nẵng</option>
                                        <option value={'QN'}>Quảng Ninh</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Địa chỉ</label>
                                <div className="col-sm-9">
                                    <textarea className="form-control" value={this.state.address} name="address" onChange={this.handleChange} readOnly={checkReadOnly}/>
                                </div>
                            </div>
                            {/* Button submit start */}
                            {elementBtnSubmit}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Form;
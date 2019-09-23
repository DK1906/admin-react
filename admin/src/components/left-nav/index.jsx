
import React ,{ Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import './index.less'
import { Menu, Icon } from 'antd';
import menuList from '../../config/menuConfig'
import {connect} from 'react-redux'
import {setHeaderTitle} from '../../redux/actions'

const { SubMenu } = Menu;





 class LeftNav extends Component{
    state = {
        collapsed: false,
      };
    
      toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
    
      getMenuNodes=(menuList)=>{
       return   menuList.map((item)=>{
            if(item.children){
              return  (<SubMenu
              key={item.key}
             
              title={
                <span>
                  <Icon type={item.icon} />
                  <span> {item.name}</span>
                </span>
              }
            >
             {this.getMenuNodes(item.children)}
             
            </SubMenu>)
            }else{
              if(item.key=== this.props.location.pathname|| this.props.location.pathname.indexOf(item.key)===0){
                this.props.setHeaderTitle(item.name)
              }
             return (<Menu.Item key={item.key} 
              style={{display:this.props.user.roleName!=='Boss'&&(item.name==='角色管理'||item.name==='用户管理')?'none':'block'}}
            >
              <Link
             
               to={item.key} onClick={()=>this.props.setHeaderTitle(item.name)} >
              <Icon type={item.icon} />
              <span > {item.name}</span>
              </Link>
            </Menu.Item>)
            }
          })
      }

      componentWillMount(){
        this.menuNode = this.getMenuNodes(menuList)
      }


    render(){
      console.log(this.props.location.pathname)
      const pathname = this.props.location.pathname;


        return(
            <div className='left-nav'>
              <Link to='/admin'> <header>
                   Admin后台
               </header></Link>
            
      
        <Menu
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[pathname]}
          mode="inline"
          theme="dark"
       
        >


          {this.menuNode }
           
         
        </Menu>
      </div>

           
        )
    }
}

export default connect(
  state=>({
    headerTitle:state.headerTitle,
    user:state.user
  }),
  {setHeaderTitle}
)(withRouter(LeftNav))
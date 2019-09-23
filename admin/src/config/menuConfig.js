

const menuList = [
    {
        key:'/admin/home',
        name:'首页',
        icon:'home'

    },
    {
        key:'category',
        name:'商品',
        icon:'laptop',
        children:[
            {
                key:'/admin/category',
        name:'品类管理',
        icon:'laptop' 
            },
            {
                key:'/admin/product',
                name:'商品管理',
                icon:'laptop'  
            }
        ]
    },
    {
        key:'/admin/user',
                name:'用户管理',
                icon:'team'  
    },
    {
        key:'/admin/role',
                name:'角色管理',
                icon:'user'  
    },
    {
        key:'/charts/bar',
        name:'图表管理',
        icon:'table',
        children:[
            {
                key:'/admin/charts/bar',
                name:'柱状图',
                icon:'table',
            },
            {
                key:'/admin/charts/line',
                name:'折线图',
                icon:'table', 
            },
            {
                key:'/admin/charts/pie',
                name:'饼图',
                icon:'table',  
            }
        ] 
    }
]


export default menuList
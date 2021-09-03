import http from '../http'
import store from '../store'
/**
 * 路由的前置守卫，调用该方法时需要传入路由对象作为参数
 */
export default (router) => {
    router.beforeEach((to, from, next) => {
        if (to.name === 'ArticleList' || to.name === 'Article') {
            //设置title
            document.title = to.meta.title ? to.meta.title : '简书'
            next()
            return
        }

        //设置title
        document.title = to.meta.title ? to.meta.title : '简书后台管理系统'

        //校验是否存在token
        if (localStorage.token) {
            //验证token是否有效，并获取用户信息及权限
            http({
                path: '/users/verify',
                method: 'get'
            }).then(res => {
                if (res.code === 200) {
                    store.commit('setUsername', res.user)
                    if (to.path !== '/login') {
                        next()
                    } else {
                        next('/admin')
                    }
                } else {
                    if (to.path !== '/login') {
                        next('/login')
                    } else {
                        next()
                    }
                }
            })
        } else {
            //判断当前要跳转的路由是否为'/login'，如果不加此判断，会报内存溢出的错误
            if (to.path !== '/login') {
                next('/login')
            } else {
                next()
            }
        }
    })
}
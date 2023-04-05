// import useBreadcrumbs from "use-react-router-breadcrumbs";
// import { publicRoutes } from "../../App/routes";
// import ProductBreadcrumb from "./ProductBreadcrumb";

// const Breadcrumbs = () => {
//   const breadcrumbs = useBreadcrumbs(publicRoutes);
//   console.log(breadcrumbs)
//   publicRoutes[3].breadcrumb = ProductBreadcrumb

//   return (
//     <>
//       {breadcrumbs.map(({ breadcrumb }) => breadcrumb)}
//     </>
//   );
// };

// export default Breadcrumbs




// import React from 'react'
// import { NavLink } from 'react-router-dom';
// import useBreadcrumbs from "use-react-router-breadcrumbs";

// const userNamesById = { 1: "John" };

// const DynamicUserBreadcrumb = ({ match }) => (
//   <span>{userNamesById[match.params.userId]}</span>
// );

// const CustomPropsBreadcrumb = ({ someProp }) => <span>{someProp}</span>;

// // define custom breadcrumbs for certain routes.
// // breadcrumbs can be components or strings.
// const routes = [
//   { path: "/users/:userId", breadcrumb: DynamicUserBreadcrumb },
//   { path: "/example", breadcrumb: "Custom Example" },
//   {
//     path: "/custom-props",
//     breadcrumb: CustomPropsBreadcrumb,
//     props: { someProp: "Hi" },
//   },
// ];

// // map & render your breadcrumb components however you want.
// const Breadcrumbs = () => {
//   const breadcrumbs = useBreadcrumbs(routes);

//   return (
//     <>
//       {breadcrumbs.map(({ match, breadcrumb }) => (
//         <NavLink key={match.pathname} to={match.pathname}>
//           {breadcrumb}
//         </NavLink>
//       ))}
//     </>
//   );
// };

import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Crumb from './Crumb';
import style from './Breadcrumbs.module.scss'
import { MAIN_ROUTE } from '../../utils/consts';

interface BreadcrumbsProps {
    productName?: string
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({productName}) => {

    const location = useLocation()

    let currentLink = ''
    const crumbsArray = location.pathname.split('/')
        .filter(crumb => crumb != '')

    const crumbs = location.pathname.split('/')
        .filter(crumb => crumb != '')
        .map((crumb, index) => {
            currentLink += `/${crumb}`
            
            return (
                <span key={crumb}>
                    <Link to={currentLink}>
                        <Crumb crumbName={crumb} productName={productName} className={style.crumb}></Crumb>
                    </Link>
                    <span className={style.stick}>
                    {`${((index === crumbsArray.length-1 || crumb == 'product') ? "" : "|")}`}
                    </span>
                </span>
            )
        })

    // const crumbsArray = location.pathname.split('/').filter(crumb => crumb != '')
    // let crumbs: ICrumb[] = []

    // crumbsArray.forEach(item => {
    //     currentLink += `/${item}`
    //     crumbs.push({
    //         name: item,
    //         path: currentLink
    //     })
    // })
    // console.log('crumbs', crumbs)

    // if (crumbs[-2]) {
    //     if (crumbs[-2].name == 'product') {
    //         const newCrumb: ICrumb = {
    //             name: 'product',
    //             path: crumbs[-1].path
    //         }
    
    //         crumbs.splice(-2, 2)
    //         crumbs.push(newCrumb)
    //     }
    // }
    

    
    //console.log(crumbsInit)
    // const crumbss = crumbsArray.map((crumb, index) => {
    //         currentLink += `/${crumb}`
    //     //console.log('cl', currentLink, crumb, (crumb == 'product'))
    //         return (
    //             <span key={crumb}>
    //                 {(crumb == 'product') ?
    //                 <span>g</span> :
    //                 <Link to={currentLink}>
    //                     <Crumb crumbName={crumb} productName={productName} className={style.crumb}></Crumb>
    //                 </Link>}
    //                 {`${((index === crumbsArray.length-1 || crumb == 'product') ? "m" : "|")}`}
    //             </span>
    //         )
    //     })

  return (
    <div className={style.Breadcrumbs}>
        {/* {
            crumbs.map((crumb, index) => 
                <span key={crumb}>
                    <Crumb crumbName={crumb} productName={productName} className={style.crumb}></Crumb>
                    <span>{`${((index === crumbs.length-1 || crumb == 'product') ? "" : "|")}`}</span>
                </span>)
        } */}
        <span>
        <Link to={MAIN_ROUTE}>
            <Crumb crumbName='main' productName={productName} className={style.crumb}></Crumb>
        </Link>
        <span className={style.stick}>|</span>
        </span>

        {/*
        {crumbs.map((crumb, index) => {
            return(
            <span key={crumb.name}>
                    <Link to={crumb.path}>
                        <Crumb crumbName={crumb.name} productName={productName} className={style.crumb}></Crumb>
                    </Link>
                    {`${((index === crumbsArray.length-1) ? "m" : "|")}`}
                </span>)
        })} */}

        {crumbs}
    </div>
  )
}

export default Breadcrumbs


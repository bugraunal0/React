import React, {useEffect} from 'react'
import {AsideDefault} from './components/aside/AsideDefault'
import {Footer} from './components/Footer'
import {Toolbar} from './components/toolbar/Toolbar'
import {ScrollTop} from './components/ScrollTop'
import {Content} from './components/Content'
import {PageDataProvider, useLayout} from './core'
import {useLocation} from 'react-router-dom'
import {
    DrawerMessenger,
    // RightToolbar,
    ActivityDrawer,
    Main,
    InviteUsers,
    UpgradePlan
} from '../partials'
import {MenuComponent} from '../../_metronic/assets/ts/components'
import clsx from 'clsx'
import { HeaderWrapper } from './components/header/HeaderWrapper'

const MasterLayout: React.FC = ({children}) => {
    const {classes} = useLayout()

    const location = useLocation()
    useEffect(() => {
        setTimeout(() => {
            MenuComponent.reinitialization()
        }, 500)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            MenuComponent.reinitialization()
        }, 500)
    }, [location.key])

    return (
        <PageDataProvider>
            <div className='page d-flex flex-row flex-column-fluid'>
                <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
                    {/*<HeaderWrapper firstname={undefined} lastname={undefined}/>*/}

                    <div id='kt_content' className='content d-flex flex-column flex-column-fluid'>
                        <Toolbar/>
                        <div
                            className={clsx(
                                'd-flex flex-column-fluid align-items-start',
                                classes.contentContainer.join(' ')
                            )}
                            id='kt_post'
                        >
                            <AsideDefault/>
                            <Content>{children}</Content>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>

            {/* begin:: Drawers */}
            <ActivityDrawer/>
            {/*<RightToolbar/>*/}
            <DrawerMessenger/>
            {/* end:: Drawers */}

            {/* begin:: Modals */}
            <Main/>
            <InviteUsers/>
            <UpgradePlan/>
            {/* end:: Modals */}
            <ScrollTop/>
        </PageDataProvider>
    )
}

export {MasterLayout}

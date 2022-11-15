import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {useIntl} from 'react-intl'

export function MenuInner() {
    //const {roles}: UserModel = useSelector<RootState>(({auth}) => auth.user) as UserModel
    const intl = useIntl();
    return (
        <>



            <MenuInnerWithSub
                title="company"
                to='/attr-list'
                icon='/media/icons/duotune/technology/Logo-Test.svg'
                menuPlacement='bottom-start'
                menuTrigger={`{default:'click', lg: 'hover'}`}>
                <MenuItem to='/deneme-list' title="company" hasBullet={true} />
                <MenuItem to='/deneme-detail/edit?id=0' title={intl.formatMessage({id: 'DENEME.ADD'})} hasBullet={true} />
            </MenuInnerWithSub>
            
            <MenuItem to='/cart-detail' title={"Cart Detail"} hasBullet={true} />
            

        </>
    )
}

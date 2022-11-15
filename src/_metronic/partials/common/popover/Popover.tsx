import {FC} from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap-v5';
import {KTSVG} from '../../../helpers'
export declare type Placement = import('react-overlays/usePopper').Placement;

type Props = {
    title: string,
    content: string,
    placement: Placement,
}

const PopoverBasic: FC<Props> = (props) => {
    const {title, content, placement} = props;

    return (
        <OverlayTrigger
            trigger="click"
            placement={placement}
            rootClose
            overlay={
                <Popover id="popover-basic">
                    <Popover.Title as="h3">{title}</Popover.Title>
                    <Popover.Content>
                        {content}
                    </Popover.Content>
                </Popover>
            }>
            <button type='button' className='btn btn-sm btn-icon'>
                <KTSVG
                    path='/media/icons/duotune/general/gen046.svg'
                    className='svg-icon-2 mb-5'
                />
            </button>
        </OverlayTrigger>
    )
}

export default PopoverBasic;
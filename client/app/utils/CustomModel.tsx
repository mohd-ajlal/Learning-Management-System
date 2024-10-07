import React from 'react'

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: any;
    component:any;
    setRoute?: (route: string) => void;
}

const CustomModel = (props: Props) => {
  return (
    <div>CustomModel</div>
  )
}

export default CustomModel
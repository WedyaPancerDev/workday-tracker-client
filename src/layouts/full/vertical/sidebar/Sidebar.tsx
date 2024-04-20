import { useMediaQuery, Box, Drawer, useTheme } from '@mui/material'
import SidebarItems from './SidebarItems'
import Logo from '@/components/Icon/Logo'
import { useSelector, useDispatch, type AppState } from '@/store/Store'
import {
  hoverSidebar,
  setToggleMobileSidebar
} from '@/store/customizer/CustomizerSlice'
import Scrollbar from '@/components/Scrollbar'
import { Profile } from './SidebarProfile/Profile'

const Sidebar = (): JSX.Element => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'))
  const customizer = useSelector((state: AppState) => state.customizer)
  const dispatch = useDispatch()
  const theme = useTheme()
  const toggleWidth =
    customizer.isCollapse && !customizer.isSidebarHover
      ? customizer.MiniSidebarWidth
      : customizer.SidebarWidth

  const onHoverEnter = (): void => {
    if (customizer.isCollapse) {
      dispatch(hoverSidebar(true))
    }
  }

  const onHoverLeave = (): void => {
    dispatch(hoverSidebar(false))
  }

  if (lgUp) {
    return (
      <Box
        component="aside"
        sx={{
          width: toggleWidth,
          flexShrink: 0,
          ...(customizer.isCollapse && {
            position: 'absolute'
          })
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          variant="permanent"
          PaperProps={{
            sx: {
              transition: theme.transitions.create('width', {
                duration: theme.transitions.duration.shortest
              }),
              width: toggleWidth,
              boxSizing: 'border-box'
            }
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              height: '100%'
            }}
          >
            {/* ------------------------------------------- */}
            {/* Logo */}
            {/* ------------------------------------------- */}
            <Box px={3} marginTop={1}>
              <Logo sx={{ height: 40, width: 40 }} />
            </Box>
            <Scrollbar sx={{ height: 'calc(100% - 190px)' }}>
              {/* ------------------------------------------- */}
              {/* Sidebar Items */}
              {/* ------------------------------------------- */}
              <SidebarItems />
            </Scrollbar>
            <Profile />
          </Box>
        </Drawer>
      </Box>
    )
  }

  return (
    <Drawer
      component="aside"
      anchor="left"
      open={customizer.isMobileSidebar}
      onClose={() =>
        dispatch(setToggleMobileSidebar(!customizer.isMobileSidebar))
      }
      variant="temporary"
      PaperProps={{
        sx: {
          width: customizer.SidebarWidth,

          // backgroundColor:
          //   customizer.activeMode === 'dark'
          //     ? customizer.darkBackground900
          //     : customizer.activeSidebarBg,
          // color: customizer.activeSidebarBg === '#ffffff' ? '' : 'white',
          border: '0 !important',
          boxShadow: (theme) => theme.shadows[8]
        }
      }}
    >
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
      <Box p={2}>
        <Logo sx={{ height: 40, width: 40 }} />
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
      <SidebarItems />
    </Drawer>
  )
}

export default Sidebar

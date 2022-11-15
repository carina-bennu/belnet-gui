import { Flex, Stack, Input, theme } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useSelector } from 'react-redux';
import {
  onUserAuthCodeSet,
  onUserExitNodeSet,
  selectExitStatus
} from '../../features/exitStatusSlice';
import CreatableSelect from "react-select/creatable";
import { selectedTheme, setTheme } from '../../features/uiStatusSlice';
import Select, { components, DropdownIndicatorProps, IndicatorSeparatorProps } from 'react-select';
import { useAppDispatch } from '../hooks';
import { paddingDividers } from './Dividers';
import DropDownWhite from '../../../images/drop_down_white.svg';
import DropDownDark from '../../../images/drop_down_dark.svg';
// let defaultExitUse;
// const exitNode = [
//   {value:defaultExitUse ||'' ,label:defaultExitUse || ''},
//   { value: "exit.beldex", label: "exit.beldex" },
//   { value: "test.beldex", label: "test.beldex" }
// ];



const ExitInput = styled(Input)`
  background-color: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.activePathColor};
  outline-color: transparent;
  font-family: 'Poppins', sans-serif;
  height: 33px;
  font-weight: 400;
  border-radius: 6px;
  border: none;
  font-size: 12px;
  padding: 10px 12px;
  outline: none;
  transition: 0.5s;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'auto')};
`;

const InputLabel = styled.div`
color: ${(props) => props.theme.appLogContentColor};
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  text-align: start;
  user-select: none;
  padding: 7px 0;
  letter-spacing: 0.75px;
`;

const DropdownIndicator = (
  props: DropdownIndicatorProps
) => {
  const themeSelected = useSelector(selectedTheme);
  return (
    <components.DropdownIndicator {...props}>
      {themeSelected === 'light' ? <img src={DropDownWhite} alt="white" /> : <img src={DropDownDark} alt="dark" />}
    </components.DropdownIndicator>
  );
};



const colourStyles = {
  control: (styles: any) => {
    const theme = useTheme();
    const themeSelected = useSelector(selectedTheme);
    const bgColour = theme.mainTabInputContainerColor;
    return ({ ...styles, backgroundColor: bgColour, border: 'none', boxShadow: 'none', borderRadius: '6px',  "&:hover": {
      boxShadow: "red"
    } })
  },
  option: (style: any, state: any) => {
    const theme = useTheme();
    return ({...style, 
      backgroundColor: state.isSelected ? '#1994FC' : theme.inputBackground, 
      width: 'fit-content',
      minWidth: '100%',
      color: state.isSelected ? '#FFFFFF' : theme.menuListColor, 
      textAlign: 'center'})
  },
  singleValue: (style: any, state: any) => {
    const theme = useTheme();
    return ({...style, color: theme.tabSelected})
  },
  clearIndicator: (style: any, state: any) => {
    const theme = useTheme();
    return ({...style, color: theme.exitNodeIconColor})
  },
  menu: (style: any, state: any) => {
    const theme = useTheme();
    return ({
      ...style,
      backgroundColor: theme.inputBackground,
      margin: '4px 0'
    })
  },
  menuList: (style: any, state: any) => {
    const theme = useTheme();
    return ({
      ...style,
      "::-webkit-scrollbar": {
        width: "150px",
        borderRadius: '10px',
        height: "6px",
      },
      "::-webkit-scrollbar-track": {
        background: theme.inputBackground
      },
      "::-webkit-scrollbar-thumb": {
        background: theme.scrollBar
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: theme.scrollBar
      }
    })
  },
}


export const ExitPanel = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const exitStatus = useSelector(selectExitStatus);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  // if the exit is loading (awaiting answer from daemon)
  // or if the exit node is set, we cannot edit the input fields.
  // We first need to disable the exit node mode
  const disableInputEdits =
    exitStatus.exitLoading || Boolean(exitStatus.exitNodeFromDaemon);
  const exitToUse = disableInputEdits
    ? exitStatus.exitNodeFromDaemon
    : exitStatus.exitNodeFromUser;
  // const exitDaemon = exitStatus.exitNodeFromDaemon;
  // defaultExitUse = exitToUse;
  const handleChange = (e: any) => {
    if (e) {
      dispatch(onUserExitNodeSet(e.value))
    }
  };
  const exitNode = [
    { value: "iyu3gajuzumj573tdy54sjs7b94fbqpbo3o44msrba4zez1o4p3o.bdx", label: "iyu3gajuzumj573tdy54sjs7b94fbqpbo3o44msrba4zez1o4p3o.bdx" },
    { value: "a6iiyy3c4qsp8kdt49ao79dqxskd81eejidhq9j36d8oodznibqy.bdx", label: "a6iiyy3c4qsp8kdt49ao79dqxskd81eejidhq9j36d8oodznibqy.bdx" },
    { value: "snoq7arak4d5mkpfsg69saj7bp1ikxyzqjkhzb96keywn6iyhc5y.bdx", label: "snoq7arak4d5mkpfsg69saj7bp1ikxyzqjkhzb96keywn6iyhc5y.bdx" },
  ];

  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);
  const IndicatorSeparator = (props: IndicatorSeparatorProps) => {
    const indicatorSeparatorStyle = {
      alignSelf: 'stretch',
      backgroundColor: theme.exitNodeIconColor,
      marginBottom: 8,
      marginTop: 8,
      width: 1,
    };
    return isMenuOpen ? <span style={indicatorSeparatorStyle} {...props} /> : null;
  };

  return (
    <Flex
      flexDirection="column"
      flexGrow={1}
    >
      <Stack direction="row" alignSelf="center" width="100%" height="100%">
        <Flex flexDirection="column" flexGrow={1}>
          <InputLabel>Exit Node</InputLabel>
          {disableInputEdits ? <ExitInput
            disabled={disableInputEdits}
            onChange={(e: any) =>
              dispatch(onUserExitNodeSet(e?.currentTarget?.value))
            }
            onPaste={(e: any) =>
              dispatch(onUserExitNodeSet(e?.currentTarget?.value))
            }
            size="sm"
            variant="flushed"
            marginBottom={2}
            spellCheck={false}
            noOfLines={1}
            value={exitToUse || ''}
          /> :
            <CreatableSelect
              isDisabled={disableInputEdits}
              isClearable={isMenuOpen}
              onChange={handleChange}
              options={exitNode}
              styles={colourStyles}
              onMenuOpen={onMenuOpen}
              onMenuClose={onMenuClose}
              components={{
                DropdownIndicator,
                IndicatorSeparator
              }}
              defaultValue={{ value: exitStatus.exitNodeFromUser, label: exitStatus.exitNodeFromUser }}
            />}
          <InputLabel>Auth Code</InputLabel>

          <ExitInput
            disabled={disableInputEdits}
            spellCheck={false}
            onChange={(e: any) =>
              dispatch(onUserAuthCodeSet(e?.currentTarget?.value))
            }
            onPaste={(e: any) =>
              dispatch(onUserAuthCodeSet(e?.currentTarget?.value))
            }
            size="sm"
            variant="flushed"
            value={exitStatus.exitAuthCodeFromUser || ''}
            marginBottom={2}
            noOfLines={1}
          />
        </Flex>
      </Stack>
    </Flex>
  );
};

import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { openModal, closeModal } from "@redq/reuse-modal";
import { DrawerProvider } from "contexts/drawer/drawer.provider";
import MobileDrawer from "./MobileDrawer";
import {
  MobileHeaderInnerWrapper,
  DrawerWrapper,
  LogoWrapper,
  SearchWrapper,
  SearchModalWrapper,
  SearchModalClose,
  Logo,
  SelectedLang,
  LanguageItem,
  LangSwithcer,
  Flag,
} from "./Header.style";
import { FormattedMessage } from "react-intl";
import SearchBox from "components/SearchBox/SearchBox";
import { SearchContext } from "contexts/search/search.context";

import { HOME_PAGE } from "constants/navigation";
import LanguageContext from "contexts/language/language.context";
import { FaInstagram, FaFacebook, FaDesktop } from "react-icons/fa";

import {
  SearchIcon,
  LongArrowLeft,
  DEFlag,
  CNFlag,
  USFlag,
  ILFlag,
  ESFlag,
  SAFlag,
} from "components/AllSvgIcon";

const NewLogoImage = require("image/logo/logo_no_bkg.svg");

type MobileHeaderProps = {
  className?: string;
  pathname?: string;
  closeSearch?: any;
};
type SearchModalProps = {
  state?: any;
  handleSearch?: any;
  pathname?: string;
};

const LanguageArray = [
  { id: "ar", label: "Arabic", intlLangName: "intlArabic", icon: <SAFlag /> },
  { id: "zh", label: "Chinese", intlLangName: "intlChinese", icon: <CNFlag /> },
  { id: "en", label: "English", intlLangName: "intlEnglish", icon: <USFlag /> },
  { id: "de", label: "German", intlLangName: "intlGerman", icon: <DEFlag /> },
  { id: "he", label: "Hebrew", intlLangName: "intlHebrew", icon: <ILFlag /> },
  { id: "es", label: "Spanish", intlLangName: "intlSpanish", icon: <ESFlag /> },
];

const SearchModal: React.FC<SearchModalProps> = ({
  state,
  pathname,
  handleSearch,
}) => {
  const router = useRouter();
  const [text, setText] = useState(state.text || "");
  const handleSearchInput = (text: string) => {
    setText(text);
  };
  const { page, ...urlState } = state;

  const handleClickSearchButton = () => {
    handleSearch(text);
    router.push({
      pathname: pathname === "/" ? "/grocery" : pathname,
      query: {
        ...urlState,
        text,
      },
    });
    closeModal();
  };

  return (
    <SearchModalWrapper>
      <SearchModalClose type="submit" onClick={() => closeModal()}>
        <LongArrowLeft />
      </SearchModalClose>
      <SearchBox
        className="header-modal-search"
        bordered={false}
        inputStyle={{ height: 35 }}
        buttonText=""
        placeholder="Search"
        handleSearch={handleSearchInput}
        value={text}
        onClick={handleClickSearchButton}
      />
    </SearchModalWrapper>
  );
};

const MobileHeader: React.FC<MobileHeaderProps> = (props) => {
  const {
    state: { lang },
    toggleLanguage,
  } = useContext<any>(LanguageContext);

  const { state, dispatch } = useContext(SearchContext);
  const { className, pathname, closeSearch } = props;

  const selectedLangindex = LanguageArray.findIndex((x) => x.id === lang);

  const handleSearch = (text: string) => {
    dispatch({
      type: "UPDATE",
      payload: {
        ...state,
        text,
      },
    });
  };

  const handleSearchModal = () => {
    openModal({
      show: true,
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "search-modal-mobile",
        width: "100%",
        height: "100%",
      },
      closeOnClickOutside: false,
      component: SearchModal,
      componentProps: { state, pathname, handleSearch },
      closeComponent: () => <div />,
    });
  };

  const handleToggleLanguage = (e) => {
    toggleLanguage(e.target.value);
    console.log(e.target.value, "switcher");
  };

  const LanguageMenu = (item: any) => {
    return (
      <LanguageItem
        onClick={handleToggleLanguage}
        key={item.id}
        value={item.id}
      >
        <span>{item.icon}</span>
        <FormattedMessage id={item.intlLangName} defaultMessage={item.label} />
      </LanguageItem>
    );
  };

  return (
    <DrawerProvider>
      <MobileHeaderInnerWrapper className={className}>
        <DrawerWrapper>
          <MobileDrawer />
        </DrawerWrapper>
        <LogoWrapper>
          <Logo>
            <Link href={HOME_PAGE}>
              <a>
                <img
                  style={{
                    width: "70px",
                    height: "70px",
                    padding: "10px",
                    marginTop: "2px",
                  }}
                  src={NewLogoImage}
                  alt="urbannuskha"
                />
              </a>
            </Link>
          </Logo>
        </LogoWrapper>

        {/* <LangSwithcer>
            <Popover
              className="right"
              handler={
                <SelectedLang>
                  <Flag style={{ margin: 0 }}>
                    {LanguageArray[selectedLangindex].icon}
                  </Flag>
                </SelectedLang>
              }
              content={<>{LanguageArray.map(LanguageMenu)}</>}
            />
          </LangSwithcer> */}

        {/* <DrawerWrapper>
          <FaInstagram size={24} />
        </DrawerWrapper>
        <DrawerWrapper>
          <FaFacebook size={24} />
        </DrawerWrapper> */}
        <SearchWrapper
          onClick={handleSearchModal}
          className="searchIconWrapper"
        >
          <SearchIcon />
        </SearchWrapper>
      </MobileHeaderInnerWrapper>
    </DrawerProvider>
  );
};

export default MobileHeader;

import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const StoreNavWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  z-index: 1;
  position: sticky;
  background-color: #fff;
  height: 42px;
  z-index: 1001;
  top: 48px;
  left: 0px;
`;

export const StoreNavLinks = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  height: 40px;
  overflow-y: hidden;
  overflow-x: auto;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  .store-nav-link {
    margin-right: 10px;

    a {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      color: #666;
      padding: 5px 9px;
      border-radius: 6px;
      line-height: 1.2;
      white-space: nowrap;

      svg {
        margin-right: 5px;
        flex-shrink: 0;
      }

      &.current-page {
        color: ${themeGet("colors.primary", "#009E7F")};
        background-color: #f8f8f8;
      }
    }
  }
`;

export default StoreNavWrapper;

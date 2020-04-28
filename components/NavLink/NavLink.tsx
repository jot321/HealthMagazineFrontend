import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { withRouter } from "next/router";
import { FormattedMessage } from "react-intl";

import { trackPageView } from "analytics";

type NavLinkProps = {
  router: any;
  href: string;
  label: string;
  identifier?: string;
  intlId?: string;
  icon?: React.ReactNode;
  className?: string;
  iconClass?: string;
  onClick?: () => void;
};

const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderText = styled.span``;

const NavLink: React.SFC<NavLinkProps> = ({
  href,
  label,
  identifier,
  intlId,
  router: { pathname, query },
  icon,
  className,
  onClick,
  iconClass,
}) => {
  let highlightNavLink = false;

  if (query.category || query.tag) {
    highlightNavLink = false;
  } else if (query.identifier) {
    if (query.identifier === identifier) {
      highlightNavLink = true;
    }
  } else if (pathname === href) {
    highlightNavLink = true;
  }

  const onClickNavLink = () => {
    trackPageView(href);
  };

  return (
    <div
      onClick={() => {
        onClickNavLink();
      }}
    >
      <div onClick={onClick} className={className ? className : ""}>
        <Link href={href}>
          <a
            className={highlightNavLink ? " current-page" : ""}
            style={{ display: "flex", alignItems: "center" }}
          >
            {icon ? <Icon className={iconClass}>{icon}</Icon> : ""}

            <HeaderText className="label">
              {intlId ? (
                <FormattedMessage
                  id={intlId ? intlId : "defaultNavLinkId"}
                  defaultMessage={label}
                />
              ) : (
                label
              )}
            </HeaderText>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default withRouter(NavLink);

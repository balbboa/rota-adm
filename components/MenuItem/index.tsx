/* eslint-disable @next/next/link-passhref */
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { MenuItem as MenuItemType } from "../../constants/menu-items";
import ExpandIcon from "../ExpandIcon";
import MenuItemsList from "../MenuItemsList";
import { MenuItemContainer } from "./MenuItem.styles";

type MenuItemProps = {
  menuItem: MenuItemType;
};

export default function MenuItem({
  menuItem: { name, icon: Icon, url, depth, subItems },
}: MenuItemProps) {
  const [isExpanded, toggleExpanded] = useState(false);

  const router = useRouter();
  const selected = router.asPath === url;
  const isNested = subItems && subItems?.length > 0;

  const onClick = () => {
    toggleExpanded((prev) => !prev);
  };

  return (
    <>
      <MenuItemContainer className={selected ? "selected" : ""} depth={depth}>
        <Link href={url}>
          <div className="menu-item">
            <Icon />
            <span>{name}</span>
          </div>
        </Link>
        {isNested ? (
          <ExpandIcon isExpanded={isExpanded} handleClick={onClick} />
        ) : null}
      </MenuItemContainer>
      {isExpanded && isNested ? <MenuItemsList options={subItems} /> : null}
    </>
  );
}

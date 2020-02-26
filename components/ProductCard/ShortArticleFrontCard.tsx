import React from "react";
import { CartContext } from "contexts/cart/cart.context";
import { FormattedMessage } from "react-intl";
import Image from "components/Image/Image";
import Button from "../Button/Button";
import InputIncDec from "../InputIncDec/InputIncDec";
import { CartIcon, Beverage } from "../AllSvgIcon";
import {
  ProductCardWrapper,
  ProductImageWrapper,
  ProductInfo,
  SaleTag,
  DiscountPercent
} from "./ShortArticleFrontCard.style";
import { getProductQuantity, findProductIndex } from "../helpers/utility";

type ProductCardProps = {
  title: string;
  description: string;
  tags?: any[];
  likes?: number;
  data: any;
  onClick?: (e: any) => void;
  onChange?: (e: any) => void;
  increment?: (e: any) => void;
  decrement?: (e: any) => void;
  value?: any;
  deviceType?: any;
};

const ShortArticleFrontCard: React.FC<ProductCardProps> = ({
  title,
  description,
  tags,
  likes,
  value,
  onChange,
  increment,
  decrement,
  data,
  deviceType,
  onClick,
  ...props
}) => {
  const { add, update, products } = React.useContext(CartContext);
  const index = data && data.id ? findProductIndex(products, data.id) : -1;
  const quantity = getProductQuantity(products, index);

  const handleClick = (e: any) => {
    e.stopPropagation();
    add(e, data);
  };

  const handleUpdate = (value: number, e: any) => {
    if (index === -1 && value === 1) {
      add(e, data);
    } else {
      update(data.id, value);
    }
  };

  likes = 2;

  return (
    <ProductCardWrapper onClick={onClick} className="product-card">
      <ProductInfo>
        <h3 className="product-title">{title}</h3>
        <span className="product-description">{description}</span>
        <div>
          {data.Topics &&
            data.Topics.map((topic: any) => {
              return <span className="product-topics">#{topic.Topic}   </span>;
            })}
        </div>
        <div className="product-meta">
          <Button
            title=""
            intlButtonId="addCartButton"
            iconPosition="left"
            colors="primary"
            size="small"
            variant="outlined"
            className="cart-button"
            icon={<Beverage />}
            onClick={e => handleClick(e)}
          />

          {likes > 0 && <span className="product-price">{likes}</span>}

          {/* {quantity <= 0 ? (
            <Button
              title=""
              intlButtonId="addCartButton"
              iconPosition="left"
              colors="primary"
              size="small"
              variant="outlined"
              className="cart-button"
              icon={<CartIcon />}
              onClick={e => handleClick(e)}
            />
          ) : (
            <InputIncDec
              value={quantity}
              onClick={(e: any) => {
                e.stopPropagation(onclick);
              }}
              onUpdate={(value: number, e: any) => handleUpdate(value, e)}
            />
          )} */}
        </div>
      </ProductInfo>
    </ProductCardWrapper>
  );
};

export default ShortArticleFrontCard;

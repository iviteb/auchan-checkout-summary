import React from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import { FormattedPrice } from 'vtex.formatted-price'
import { useCssHandles } from 'vtex.css-handles'
import { Tooltip } from 'react-tooltip'

import { slugify } from '../modules/slugify'
import InfoIcon from '../icons/InfoIcon'

defineMessages({
  Shipping: {
    id: 'store/checkout-summary.Shipping',
    defaultMessage: 'Delivery',
  },
  Items: {
    id: 'store/checkout-summary.Items',
    defaultMessage: 'Subtotal',
  },
  Total: {
    id: 'store/checkout-summary.Total',
    defaultMessage: 'Total',
  },
  Discounts: {
    id: 'store/checkout-summary.Discounts',
    defaultMessage: 'Discounts',
  },
  Packaging: {
    id: 'store/checkout-summary.Packaging',
    defaultMessage: 'Taxa Ambalare',
  },
  Tax: {
    id: 'store/checkout-summary.Tax',
    defaultMessage: 'Taxes',
  },
})

interface Props {
  label: string
  name?: string
  large: boolean
  value: number | null
  originalValue?: number
}

const CSS_HANDLES = [
  'summaryItemContainer',
  'summaryItemLabel',
  'summaryItemPrice',
  'summaryItemOriginalPrice',
  'packagingTooltipWrapper',
  'packagingTooltip',
  'packagingTooltipContent',
] as const

function SummaryItem({ label, name, large, value, originalValue = 0 }: Props) {
  const handles = useCssHandles(CSS_HANDLES)
  const itemId = slugify(label)

  const tooltipContent = (
    <div className={`${handles.packagingTooltipContent} f6 lh-copy`}>
      <FormattedMessage id="store/checkout-summary.PackagingTooltip" />
    </div>
  )

  return (
    <div
      className={`flex w-100 c-on-base lh-copy items-center ${
        handles.summaryItemContainer
      } ${large ? 'f4 mt4 pb5' : 'mt3'}`}
    >
      <div
        id={itemId}
        className={`${handles.summaryItemLabel} flex-none fw6 fw5-l`}
      >
        {name ||
          (label && (
            <FormattedMessage id={`store/checkout-summary.${label}`} />
          ))}
        {itemId === 'packaging' && (
          <div
            className={`${handles.packagingTooltipWrapper} inline-flex items-center c-on-base`}
          >
            <InfoIcon
              width={20}
              height={20}
              className="pointer outline-0"
              id="packaging-tooltip-info"
            />
            <Tooltip
              anchorSelect="#packaging-tooltip-info"
              closeOnEsc
              closeOnScroll
              closeOnResize
              className={`${handles.packagingTooltip} br2`}
            >
              {tooltipContent}
            </Tooltip>
          </div>
        )}
      </div>
      {itemId === 'items' && value && originalValue > value && (
        <div
          id="original-items-price"
          className={`flex-auto tr c-danger strike ${
            handles.summaryItemOriginalPrice
          } ${large ? 'fw6 fw5-l' : ''}`}
        >
          <FormattedPrice value={originalValue / 100} />
        </div>
      )}
      <div
        id={`${itemId}-price`}
        className={`flex-auto tr ${handles.summaryItemPrice} ${
          large ? 'fw6 fw5-l' : ''
        }`}
      >
        <FormattedPrice value={value ? value / 100 : value} />
      </div>
    </div>
  )
}

export default SummaryItem

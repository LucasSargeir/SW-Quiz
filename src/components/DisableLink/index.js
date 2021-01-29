/* eslint-disable no-unused-vars */
import React from 'react';
import NextLink from 'next/link';

// eslint-disable-next-line react/prop-types
export default function DisableLink({ children, href, ...props }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <a {... props} style={{ background: 'grey' }}>
      {children}
    </a>
  );
}

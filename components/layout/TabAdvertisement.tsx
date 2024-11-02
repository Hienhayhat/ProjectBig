"use client"
import React, { useState } from 'react';
import { Button, Checkbox, Divider, Tabs } from 'antd';
const CheckboxGroup = Checkbox.Group;






const items = new Array(3).fill(null).map((_, i) => {
    const id = String(i + 1);
    return {
        label: `Tab ${id}`,
        key: id,
        children: `Content of tab ${id}`,
    };
});

const TabAdvertiserment = () => {


    return (
        <>
            <Tabs tabBarExtraContent={<button> 123</button>} items={items} />
        </>
    );
};


export default TabAdvertiserment;
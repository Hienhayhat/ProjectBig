"use client"
import React, { useState } from 'react';
import { Button, Checkbox, Divider, Tabs } from 'antd';
const items = new Array(3).fill(null).map((_, i) => {
    const id = String(i + 1);
    return {
        label: `Tab ${id}`,
        key: id,
        children: `Content of tab ${id}`,
    };
});

const operations = <Button onClick={ }>right</Button>;
const TabAdvertiserment = () => {


    return (
        <>
            <Tabs tabBarExtraContent={operations}
                items={items} centered type='card' />
        </>
    );
};


export default TabAdvertiserment;
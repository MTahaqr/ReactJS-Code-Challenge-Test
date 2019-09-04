import React from 'react'

import styled from 'styled-components'

const Filter = ({ onSelect }) => (
    <Wrapper >
        <Ul>
            <Li onClick={() => onSelect('all')}>View All </Li>
            <Li>/</Li>
            <Li onClick={() => onSelect('active')}> Active </Li>
            <Li>/</Li>
            <Li onClick={() => onSelect('completed')}> Completed </Li>
        </Ul>
    </Wrapper>
)

const Wrapper = styled.p`
  font-size: 15px;
  cursor: pointer;
  margin: 0px
`
const Ul = styled.ul`
display: flex;
list-style: none
`
const Li = styled.li`
margin-right: 25px
`
export default Filter

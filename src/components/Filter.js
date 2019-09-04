import React from 'react'

import styled from 'styled-components'

const Filter = ({ onSelect, getFilterType }) => (
    <Wrapper >
        <Ul>
            <Li onClick={() => onSelect('all')} selected={getFilterType === 'all'}>View All </Li>
            <Li>/</Li>
            <Li onClick={() => onSelect('active')} selected={getFilterType === 'active'}> Active </Li>
            <Li>/</Li>
            <Li onClick={() => onSelect('completed')}selected={getFilterType === 'completed'} > Completed </Li>
        </Ul>
    </Wrapper>
)

const Wrapper = styled.div`
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
color: ${props => props.selected? 'white': 'grey' }
&:focus{
    color: black;
}
`
export default Filter

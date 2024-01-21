// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

/**
 * @title 状态管理的案例(注意：该案例没有权限校验，不可直接使用)
 */
contract Storage {
    mapping(uint256 => uint256) private claimedBitMap;

    /**
     * @dev 设置指定index的状态为claimed
     * @param _index 指定的index
     */
    function setClaimed(uint256 _index) public {
        //每隔256个index指定一个新的数字(实际上这里的分母可以小于256，但不可大于256，不然一个数字的bit位置不够用)，这里设置256已经是空间利用最大化
        uint256 claimedWordIndex = _index / 256;
        //通过取模计算在分配哪个bit位置给这个_index记录状态
        //这里取模的目的是算出将用一个数字的哪个bit位置记录状态（分母256是为了让上面256个index都能在数字claimedWordIndex指向的插槽各有一个为位置）
        uint256 claimedBitIndex = _index % 256;
        // claimedBitMap[claimedWordIndex]是从map中取出claimedWordIndex所指向的插槽中的数字
        // 也就是说每个数字有256个位置，因此每设置一个_index的状态，都将该数字对应的bit位置由于0设置为1
        //(1 << claimedBitIndex)将数字1的二进制表示向左移动 claimedBitIndex 位。这样就得到了一个只有第 claimedBitIndex 位为1，其他位为0的数
        // claimedBitMap[claimedWordIndex] | (1 << claimedBitIndex) 的目的是该数字的所有bit位置如果原值是1则仍然保留1,并将新计算的位置值设置为1，另外一些位置仍保持值为0
        //至此就成功的将_index的状态设置为1，并且记录在数字claimedWordIndex的第claimedBitIndex个bit位置中
        claimedBitMap[claimedWordIndex] =
            claimedBitMap[claimedWordIndex] |
            (1 << claimedBitIndex);
    }

    /**
     * @dev 判断指定的index的状态是否为claimed
     * @param _index 指定的index
     */
    function isClaimed(uint256 _index) public view returns (bool) {
        uint256 claimedWordIndex = _index / 256;
        uint256 claimedBitIndex = _index % 256;
        //取出记录了_index状态的数字
        uint256 claimedWord = claimedBitMap[claimedWordIndex];
        //mask 是一个只有特定位为1，其他位为0的数,具体参考setClaimed
        uint256 mask = (1 << claimedBitIndex);
        //claimedWord & mask： 如果 claimedWord 中的特定位与 mask 中的对应位都为1，那么结果就等于 mask，否则结果是0
        //最后【== mask】是为了判断【claimedWord & mask】结果的特定位置是1
        //因此这句的效果是判断_index在数字claimedWordIndex的第claimedBitIndex个bit位置是否已被设置为1
        return claimedWord & mask == mask;
    }
}

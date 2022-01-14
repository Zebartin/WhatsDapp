pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Review {
    struct Comment {
        uint256 rating; // 评分，1~10
        string content; // 具体评价内容
    }
    struct Item {
        string name; // 项目名称
        uint256 commentCnt; // 评论数量
        mapping(uint256 => Comment) comments; // 此项目的所有评论
        string[] infoAttrs; // 具体信息，比如学校、出版时间等
        string[] infoVals; // 具体信息值，比如北大、2012年5月等
    }
    uint256 public itemCnt;
    mapping(uint256 => Item) public items; // 所有的项目

    // 创建新Item
    function createItem(
        string memory name
    ) public returns (uint256) {
        Item storage it = items[itemCnt];
        itemCnt = itemCnt + 1;
        it.name = name;
        return itemCnt - 1;
    }

    // 写评论
    function makeComment(
        uint256 itemID,
        uint256 rating,
        string memory content
    ) public returns (uint256) {
        Item storage it = items[itemID];
        Comment storage com = it.comments[it.commentCnt];
        it.commentCnt = it.commentCnt + 1;
        com.rating = rating;
        com.content = content;
        return it.commentCnt - 1;
    }

    // 查看Item除了评论具体内容以外的所有信息
    function readItem(uint256 itemID)
        public
        view
        returns (
            string memory,
            string[] memory,
            string[] memory,
            uint256[] memory
        )
    {
        Item storage it = items[itemID];
        uint256[] memory ratings = new uint256[](it.commentCnt);
        for (uint256 i = 0; i < it.commentCnt; i++) {
            ratings[i] = it.comments[i].rating;
        }
        return (it.name, it.infoAttrs, it.infoVals, ratings);
    }

    // 查看评论内容
    function readCommentContent(uint256 itemID, uint256 commentID)
        public
        view
        returns (string memory)
    {
        Item storage it = items[itemID];
        return it.comments[commentID].content;
    }
}

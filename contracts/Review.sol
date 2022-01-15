pragma solidity ^0.5.0;
//pragma experimental ABIEncoderV2;

contract Review {
    struct Comment {
        address addr;    // 评论的人
        uint256 rating; // 评分，1~10
        string content; // 具体评价内容
    }
    struct Item {
        address addr;          // 项目发起者
        string name;           // 老师名称
        string classification; // 老师所在的学校
        string belongs;        // 老师所在的学院
        uint256 commentCnt;    // 评论数量
        mapping(uint256 => Comment) comments; // 此项目的所有评论
        string details;        // 详细信息
        // string[] infoAttrs; // 具体信息，比如学校、出版时间等
        // string[] infoVals; // 具体信息值，比如北大、2012年5月等
    }
    uint256 public itemCnt;
    mapping(uint256 => Item) public items; // 所有的老师

    // 创建新Item
    function createItem(
        string memory name, string memory classification, string memory belongs, string memory details
    ) public returns (uint256) {
        Item storage it = items[itemCnt];
        itemCnt = itemCnt + 1;
        it.name = name;
        it.classification = classification;
        it.belongs = belongs;
        it.details = details;
        return itemCnt - 1;
    }

    // 写评论
    function makeComment(
        address addr,
        uint256 itemID,
        uint256 rating,
        string memory content
    ) public returns (uint256) {
        Item storage it = items[itemID];
        Comment storage com = it.comments[it.commentCnt];
        it.commentCnt = it.commentCnt + 1;
        com.addr = addr;
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
            string memory,
            string memory,
            uint256
        )
    {
        Item storage it = items[itemID];
        // uint256 ratings = 0;
        // for (uint256 i = 0; i < it.commentCnt; i++) {
        //     ratings = ratings + it.comments[i].rating;
        // }
        // if(it.commentCnt != 0) ratings = ratings / it.commentCnt;
        // else ratings = 0;
        return (it.name, it.classification, it.belongs, it.commentCnt);
    }

    // 查看评论内容
    function readCommentContent(uint256 itemID, uint256 commentID)
        public
        view
        returns (string memory, uint256 rating)
    {
        Item storage it = items[itemID];
        return (it.comments[commentID].content, it.comments[commentID].rating);
    }
}

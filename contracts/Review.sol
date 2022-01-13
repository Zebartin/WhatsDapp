pragma solidity ^0.5.0;

contract Review {
    struct Comment {
        uint256 rating; // 评分，1~10
        string content; // 具体评价内容
    }
    struct Item {
        string name; // 项目名称
        Comment[] comments; // 此项目的所有评论
        mapping(string => string) info; // 具体信息，比如学院、出版时间等
    }
    uint256 public numItems; // 项目数量
    Item[] public items; // 所有的项目

    function createItem(string name, mapping(string => string) info)
        public
        returns (uint256)
    {}

    function makeComment(
        uint256 itemID,
        uint256 rating,
        string content
    ) public returns (uint256) {}

    // 免费查看Item除了评论具体内容以外的所有信息
    function readItem(uint256 itemID)
        public
        returns (
            string,
            mapping(string => string),
            string[]
        )
    {}

    // 付费查看评论内容
    function readCommentContent(uint256 itemID, uint256 commentID)
        public
        returns (string)
    {}
}

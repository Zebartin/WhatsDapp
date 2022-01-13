pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Review {
    struct Comment {
        uint256 rating; // 评分，1~10
        string content; // 具体评价内容
    }
    struct Item {
        string name; // 项目名称
        uint256 commentCnt;
        mapping(uint256 => Comment) comments; // 此项目的所有评论
        string[] infoAttrs; // 具体信息，比如学院、出版时间等
        string[] infoVals;
    }
    Item[] public items; // 所有的项目

    function createItem(
        string memory name,
        string[] memory attrs,
        string[] memory vals
    ) public returns (uint256) {
        Item memory it;
        it.name = name;
        it.infoAttrs = attrs;
        it.infoVals = vals;
        return items.push(it);
    }

    function makeComment(
        uint256 itemID,
        uint256 rating,
        string memory content
    ) public returns (uint256) {}

    // 免费查看Item除了评论具体内容以外的所有信息
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

    // 付费查看评论内容
    function readCommentContent(uint256 itemID, uint256 commentID)
        public
        returns (string memory)
    {}
}

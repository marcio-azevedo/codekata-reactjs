
// app.jsx
var React = require('react');
var ReactDOM = require('react-dom');

// ###### DATA ######

var data = [{ id: 1, author: "Pete Hunt", text: "This is one comment" }, { id: 2, author: "Jordan Walke", text: "This is *another* comment" }];

/* ###### COMPONENTS ######

- CommentBox
  - CommentList
    - Comment
  - CommentForm

*/

var CommentBox = React.createClass({
    displayName: 'CommentBox',

    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: (function (data) {
                this.setState({ data: data });
            }).bind(this),
            error: (function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }).bind(this)
        });
    },
    render: function () {
        return React.createElement(
            'div',
            { className: 'commentBox' },
            React.createElement(
                'h1',
                null,
                'Comments'
            ),
            React.createElement(CommentList, { data: this.state.data }),
            React.createElement(CommentForm, null)
        );
    }
});

var CommentList = React.createClass({
    displayName: 'CommentList',

    render: function () {
        var commentNodes = this.props.data.map(function (comment) {
            return React.createElement(
                Comment,
                { author: comment.author, key: comment.id },
                comment.text
            );
        });
        return React.createElement(
            'div',
            { className: 'commentList' },
            commentNodes
        );
    }
});

var CommentForm = React.createClass({
    displayName: 'CommentForm',

    render: function () {
        return React.createElement(
            'div',
            { className: 'commentForm' },
            'Hello, world! I am a CommentForm.'
        );
    }
});

var Comment = React.createClass({
    displayName: 'Comment',

    rawMarkup: function () {
        var rawMarkup = marked(this.props.children.toString(), { sanitize: true });
        return { __html: rawMarkup };
    },
    render: function () {
        return React.createElement(
            'div',
            { className: 'comment' },
            React.createElement(
                'h2',
                { className: 'commentAuthor' },
                this.props.key,
                ' - ',
                this.props.author
            ),
            React.createElement('span', { dangerouslySetInnerHTML: this.rawMarkup() })
        );
    }
});

ReactDOM.render(React.createElement(CommentBox, { url: '/api/comments/' }), document.getElementById('react'));
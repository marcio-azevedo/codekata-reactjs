using System.Collections.Generic;
using Nancy;
using Nancy.Conventions;

namespace Prologue.ReactJS.Web
{
    // https://github.com/NancyFx/Nancy/wiki/

    public class ApplicationBootstrapper : DefaultNancyBootstrapper
    {
        protected override void ConfigureConventions(NancyConventions nancyConventions)
        {
            nancyConventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddFile("index.html", "index.html"));
            nancyConventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("assets", @"assets"));
            nancyConventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("images", @"images"));
            base.ConfigureConventions(nancyConventions);
        }
    }

    public class MainModule : NancyModule
    {
        public MainModule()
        {
            //Before += ctx =>
            //{
            //    //Console.Out.WriteLineAsync("Before Request.");

            //    var path = ctx.Request.Path; // "/"

            //    // A return value of null means that no action is taken by the interceptor and that the request should proceed to be processed by the matching route.
            //    return null;
            //};

            //After += ctx =>
            //{
            //    // Modify ctx.Response
            //};

            Get["/"] = _ => View["index"];
            Get["/home/"] = _ => View["index"];
            Get["/index/"] = _ => View["index"];

            var comments = new List<Comment>()
            {
                new Comment
                {
                    Id = 1,
                    Author = "Pete Hunt",
                    Text = "This is one comment"
                },
                new Comment
                {
                    Id = 2,
                    Author = "Jordan Walke",
                    Text = "This is *another* comment"
                }
            };

            Get["/api/comments"] = parameters => Response.AsJson(comments);

        }

        // TODO: https://github.com/NancyFx/Nancy/wiki/Forms-Authentication

    }

    #region Contracts

    public class Comment
    {
        public int Id { get; set; }
        public string Author { get; set; }
        public string Text { get; set; }
    }

    #endregion
}

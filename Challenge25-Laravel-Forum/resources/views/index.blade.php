@include('layouts.partials.header')

<body class="antialiased">

    @include('layouts.navigation')

    @if(Session::has('success'))
    <div class="p-4 mb-4 text-sm text-center text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
        {{ Session::get('success') }}
    </div>
    @endif
    @if(Session::has('error'))
    <div class="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {{ Session::get('error') }}
    </div>
    @endif

    <div class="flex flex-row justify-center">
        <div class="basis-2/3 text-center">
            <h1 class="mt-10 text-2xl text-red-900">Welcome to the Forum</h1>
            <div class="text-start">
                <a type="button" href="{{ route('forums.create')}}" class="text-sm p-1.5 pl-5 pr-5 transition-colors duration-700 transform bg-cyan-600 hover:bg-cyan-500 text-gray-100 rounded-lg focus:border-2 border-cyan-300 mt-5 ml-0 mr-auto">Add new discussion</a>
            </div>

            @auth
            @if(Auth::user()->isAdmin())
            <div class="text-start">
                <a type="button" href="{{ route('forums.pending')}}" class="text-sm p-1.5 pl-5 pr-5 transition-colors duration-700 transform bg-gray-600 hover:bg-gray-500 text-gray-100 rounded-lg focus:border-2 border-gray-300 mt-5 ml-0 mr-auto">Approve discussions</a>
            </div>
            @endif
            @endauth
            @foreach($forums as $forum)
            @if ($forum->is_active == true)
            
                <div class="flex w-full mx-auto my-5 border rounded-lg">
                    <div>
                    <a href="{{ route('forums.show', $forum)}}"><img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="{{ asset('storage/'.$forum->image) }}" alt=""></a>
                    </div>
                    <div class="flex flex-col p-4 leading-normal text-start w-2/3">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="{{ route('forums.show', $forum)}}">{{ $forum->title}}</a></h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ $forum->description}}</p>
                    </div>
                    <div class="flex flex-col justify-between p-4 leading-normal w-1/5">
                        <div>
                            <p class="text-sm text-gray-500">{{$forum->category->name}} | {{$forum->user->name}}</p>
                        </div>
                        @auth
                        @if(Auth::user()->isAdmin() || $forum->user_id == Auth::id())
                        <div class="flex justify-around">
                            <div>
                                <a href="{{ route('forums.edit', $forum->id) }}"><i class="fa-regular fa-pen-to-square"></i></a>
                            </div>
                            <div>
                                <form action="{{ route('forums.destroy', $forum) }}" method="POST">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit"><i class="fa-solid fa-trash-can"></i></button>
                                </form>
                            </div>
                        </div>
                        @endif
                        @endauth

                    </div>
                </div>
           
            @endif
            @endforeach
        </div>

    </div>

</body>

</html>